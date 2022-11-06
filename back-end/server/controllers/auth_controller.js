require('dotenv').config();

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

// TODO: model那邊的邏輯還沒寫，目前先隨便回
const register = async (req, res) => {
  res.status(200).send({ message: 'Register route ' });
};

// TODO: model那邊的邏輯還沒寫，目前先隨便回
const login = async (req, res) => {
  res.status(200).send({ message: 'Login route ' });
};

module.exports = {
  register,
  login,
  registerSchema,
  loginSchema,
};
