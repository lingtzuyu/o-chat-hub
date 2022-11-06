require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { db } = require('./mysqlconn');
const salt = parseInt(process.env.BCRYPT_SALT);
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env; // 30 days by seconds

// register的body需要含有
// 1. username
// 2. password
// 3. mail

// TODO: chec mail exist的邏輯: mailCheck 回boolean

const signUp = async (name, email, password) => {
  const conn = await db.getConnection();
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

    // insert into user table
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

module.exports = { signUp };
