require('dotenv').config();

const { sqlDB } = require('./mysqlconn');
const { SQLException } = require('../services/exceptions/sql_exception');
const { Exception } = require('../services/exceptions/exception');

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

// check if the mail exist (login)
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

// fetch current user profile data from token
const fetchUserProfile = async (userId) => {
  const presentFunctionName = 'fetchUserProfiles';
  try {
    const checkUserQuery = `SELECT * 
    FROM user 
    WHERE id = ?`;
    const [result] = await sqlDB.query(checkUserQuery, [userId]);
    return result[0];
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error while fetching user data for userId: ${userId}`,
      presentFunctionName,
    );
  }
};

// FIXME: 尚未檢查
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

module.exports = {
  register,
  updateJWTtoken,
  upateNewUsername,
  fetchUserProfile,
  checkUserExistByMail,
};
