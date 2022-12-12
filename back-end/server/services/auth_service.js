require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { APIException } = require('./exceptions/api_exception');

const { TOKEN_EXPIRE, TOKEN_SECRET, BCRYPT_SALTROUND } = process.env;

const createJWTtoken = async (username, mail, userId) => {
  const presentFunctionName = 'createJWTtoken';
  if (!username || !mail || !userId) {
    throw new APIException(
      'Missing userID, mail or username for JWTtoken payload',
      'Missing necessary data for JWTtoken payload',
      400,
      presentFunctionName,
    );
  }
  const accessToken = jwt.sign({ username, mail, userId }, TOKEN_SECRET);
  return accessToken;
};

const verifyJWTtoken = async (token) => {
  const presentFunctionName = 'verifyJWTtoken';
  try {
    const verifiedToken = jwt.verify(token, TOKEN_SECRET);
    return verifiedToken;
  } catch (err) {
    throw new APIException(
      'Invalid token',
      `Invalid token ${token}`,
      401,
      presentFunctionName,
    );
  }
};

module.exports = { createJWTtoken, verifyJWTtoken };
