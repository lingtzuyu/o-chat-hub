require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { sqlDB } = require('./mysqlconn');
const salt = parseInt(process.env.BCRYPT_SALT);
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

// register的body需要含有
// 1. username
// 2. password
// 3. mail

const signUp = async (name, email, password) => {
  const conn = await sqlDB.getConnection();
  try {
    const createdDate = new Date();
    const hashPassword = await bcrypt.hash(password, salt);
    // 要插入sql DB的資料
    const user = {
      mail: email,
      password: hashPassword,
      username: name,
      createddate: createdDate,
      access_expired: TOKEN_EXPIRE,
    };

    // sign JWT token
    const accessToken = jwt.sign(
      {
        name: user.username,
        mail: user.mail,
      },
      TOKEN_SECRET
    );

    // 在user這個object新增accessToken
    user.accesstoken = accessToken;

    // insert into user table TODO: change to execute later
    const insertUser = 'INSERT INTO user SET ?';
    const [result] = await conn.query(insertUser, user);
    // 返還insertId
    user.id = result.insertId;
    return { user };
  } catch (err) {
    // 因為將email設為唯一
    return {
      error: 'Email Already Exists',
      status: 403,
    };
  } finally {
    await conn.release();
  }
};

const signIn = async (email, password) => {
  const conn = await sqlDB.getConnection();
  try {
    // 需要同時更新access token以及login at，所有用transaction
    await conn.query('START TRANSACTION');
    const queryUser = 'SELECT * FROM user WHERE mail = ?';
    const [users] = await conn.query(queryUser, [email]);
    const user = users[0];

    // use bcrypt sign and jwt to verify
    // 1. verify req.body.password 與 sql提出來的user資料
    if (!bcrypt.compareSync(password, user.password)) {
      await conn.query('COMMIT');
      return { error: 'Wrong email or password' };
    }

    const loginTime = new Date();
    // 2. 生成accessToken
    const accessToken = jwt.sign(
      {
        name: user.username,
        mail: user.mail,
      },
      TOKEN_SECRET
    );

    const updateUserLogin =
      'UPDATE user SET accesstoken = ?, access_expired = ?, lastlogin = ? WHERE id = ?';
    await conn.query(updateUserLogin, [
      accessToken,
      TOKEN_EXPIRE,
      loginTime,
      user.id,
    ]);

    await conn.query('COMMIT');

    // 回應資料
    user.accessToken = accessToken;
    user.lastlogin = loginTime;
    user.access_expired = TOKEN_EXPIRE;

    return { user };
  } catch (err) {
    await conn.query('ROLLBACK');
    return { err };
  } finally {
    await conn.release();
  }
};

module.exports = { signUp, signIn };
