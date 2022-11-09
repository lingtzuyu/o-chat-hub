require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../models/auth_model');

const { TOKEN_SECRET } = process.env;

// use joi and validator to validate the input

// joi rule for schema
// 1. 8~20位數的username以及password
// 2. mail foprmat
const registerSchema = Joi.object({
  username: Joi.string().min(8).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

// register邏輯
const register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password) {
      res.status(400).send({
        error: 'Username, email and password are required.',
      });
      return;
    }

    // call signUp to insertInto DB
    const result = await User.signUp(username, mail, password);

    // email already exist會進到這邊
    if (result.error) {
      res.status(403).send({ error: result.error });
      return;
    }

    res.status(200).json({
      data: {
        tokeninfo: {
          accessToken: result.user.accesstoken,
          accessExpired: result.user.access_expired,
        },
        userinfo: {
          id: result.user.id,
          name: result.user.username,
          mail: result.user.mail,
        },
      },
    });
  } catch (err) {
    res.status(500).send('Error, please check input format');
  }
};

// login邏輯
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).send({
        error: 'Email and password are required.',
      });
    }

    const result = await User.signIn(mail, password);
    const loginReturnData = {
      accessToken: result.user.accesstoken,
      lastLogin: result.user.lastlogin,
      username: result.user.username,
      userId: result.user.id,
      mail: result.user.mail,
    };
    return res.status(200).send(loginReturnData);
  } catch (err) {
    res.status(500).send('Internal Error');
  }
};

const verifiedAuth = async (req, res, next) => {
  let token = req.body.token || req.headers.authorization;
  if (!token) {
    return res.status(403).send('Token missing');
  }
  try {
    // decode the token, 移除bearer
    token = token.replace(/^Bearer\s+/, '');
    const verifiedToken = jwt.verify(token, TOKEN_SECRET);

    // info for next()
    req.user = verifiedToken;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};

// TODO: 驗證前端過來的token對不對以建立後續的socket連線，若pass，則next下去
// https://www.tabnine.com/code/javascript/functions/socket.io/Handshake/query
const socketAuthVerified = (socket, next) => {
  // 等等從socket丟過來的
};

// TODO: 這邊要過給socket.server建立連線時來用

module.exports = {
  register,
  login,
  registerSchema,
  loginSchema,
  verifiedAuth,
  socketAuthVerified,
};
