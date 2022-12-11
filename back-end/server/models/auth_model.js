require('dotenv').config();

const { sqlDB } = require('./mysqlconn');
const { SQLException } = require('../services/exceptions/sql_exception');
const { Exception } = require('../services/exceptions/exception');

// FIXME: 待刪除，應該會在controller那處理
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = parseInt(process.env.BCRYPT_SALTROUND);
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env;

// insert basic info while register
const register = async (username, mail, hasedPassword, createdDate) => {
  const presentFunctionName = 'register';
  try {
    const insertUserDataQuery = ` 
    INSERT INTO user (username, mail, password, createddate) 
      value (?, ?, ?, ?)`;
    const [result] = await sqlDB.execute(insertUserDataQuery, [
      username,
      mail,
      hasedPassword,
      createdDate,
    ]);
    // return userID to genereate jwt token
    return result.insertId;
  } catch (err) {
    // remind duplicted register
    if (err.sqlMessage.includes('Duplicate')) {
      throw new SQLException(
        'Email already exist in user table',
        'Duplicated email name is not allowed in user talbe',
        'user',
        'insert',
        'register',
      );
    }
    // general error handling
    throw new Exception(
      'Internal error',
      `Unknow error for the insert user request, input mail: ${mail}`,
      presentFunctionName,
    );
  }
};

// update jwt token when register or login
const updateJWTtoken = async (
  userId,
  accessToken,
  createdDate,
  tokenExpired,
) => {
  const presentFunctionName = 'updateJWTtoken';
  try {
    const updateJWTtokenQuery = ` 
    UPDATE user 
      SET accesstoken = (?), access_expired = (?), lastlogin = (?) WHERE id = (?)`;
    await sqlDB.execute(updateJWTtokenQuery, [
      accessToken,
      tokenExpired,
      createdDate,
      userId,
    ]);
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error for the update JWTtoken, related userId: ${userId}`,
      presentFunctionName,
    );
  }
};

// check if the mail exist
const checkUserExistByMail = async (mail) => {
  const presentFunctionName = 'checkUserExistByMail';
  try {
    const checkUserExistQuery = `
  SELECT id, password, username
    FROM user
    WHERE mail = (?)`;
    const [userLoginInfo] = await sqlDB.execute(checkUserExistQuery, [mail]);
    return userLoginInfo[0];
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error while checking user exists, related mail: ${mail}`,
      presentFunctionName,
    );
  }
};

const upateNewUsername = async (username, organization, mail) => {
  const updateUserNameQuery =
    'UPDATE user SET username = ?, organization = ? WHERE mail = ? ';
  const response = await sqlDB.query(updateUserNameQuery, [
    username,
    organization,
    mail,
  ]);
  return response;
};

// FIXME: 廢棄
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
    // FIXME: jwt包包包包包id
    const accessToken = jwt.sign(
      {
        name: user.username,
        mail: user.mail,
      },
      TOKEN_SECRET,
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

// FIXME: 廢棄
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
      TOKEN_SECRET,
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

module.exports = {
  register,
  updateJWTtoken,
  upateNewUsername,
  checkUserExistByMail,
};
