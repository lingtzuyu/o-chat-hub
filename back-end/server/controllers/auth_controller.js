require('dotenv').config();
const User = require('../models/auth_model');

// use joi and validator to validate the input
const Joi = require('joi');

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
          access_token: result.user.accesstoken,
          access_expired: result.user.access_expired,
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
    loginReturnData = {
      accessToken: result.user.accesstoken,
      lastLogin: result.user.lastlogin,
    };
    return res.status(200).send(loginReturnData);
  } catch (err) {
    res.status(500).send('Internal Error');
  }
};

module.exports = {
  register,
  login,
  registerSchema,
  loginSchema,
};
