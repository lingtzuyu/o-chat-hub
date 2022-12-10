require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { TOKEN_EXPIRE, TOKEN_SECRET, BCRYPT_SALTROUND } = process.env;

const createJWTtoken = async (username, mail, userId) => {
  const accessToken = jwt.sign({ username, mail, userId }, TOKEN_SECRET);
  return accessToken;
};

module.exports = { createJWTtoken };
