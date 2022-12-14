require('dotenv').config();

const bcrypt = require('bcryptjs');
const Joi = require('joi');

const UserModel = require('../models/auth_model');
const UserService = require('../services/auth_service');

const { TOKEN_EXPIRE, TOKEN_SECRET, BCRYPT_SALTROUND } = process.env;

// Input validation (register)
const registerSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

// Input validation (login)
const loginSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

// register
const register = async (req, res) => {
  const { username, mail, password } = req.body;

  if (!username || !mail || !password) {
    res.status(400).send({
      msg: 'Username, email and password are required.',
    });
    return;
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(BCRYPT_SALTROUND, 10),
  );

  // account created date
  const createdDate = new Date();

  const result = await UserModel.register(
    username,
    mail,
    hashedPassword,
    createdDate,
  );

  const userId = result;

  const accessToken = await UserService.createJWTtoken(username, mail, userId);

  // update accessToken to user table immediately after signup
  await UserModel.updateJWTtoken(
    userId,
    accessToken,
    createdDate,
    TOKEN_EXPIRE,
  );

  res.status(200).json({
    data: {
      tokeninfo: {
        accessToken,
      },
      userinfo: {
        userId,
        username,
        mail,
      },
    },
  });
};

// login
const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).send({
      msg: 'Email and password are required.',
    });
  }

  // check if the mail exists
  const userBasicInfo = await UserModel.checkUserExistByMail(mail);
  if (!userBasicInfo) {
    return res.status(401).send({
      msg: 'Unauthoirzed, user not exists',
    });
  }

  // compare the password and hashed password
  const comparedPassword = await bcrypt.compare(
    password,
    userBasicInfo.password,
  );
  if (!comparedPassword) {
    return res.status(403).send({
      msg: 'Unauthenticated, mail or password is wrong',
    });
  }

  // create jwt token
  const createdDate = new Date();
  const accessToken = await UserService.createJWTtoken(
    userBasicInfo.username,
    mail,
    userBasicInfo.id,
  );

  // update jwt token in user table

  await UserModel.updateJWTtoken(
    userBasicInfo.id,
    accessToken,
    createdDate,
    TOKEN_EXPIRE,
  );

  return res.status(200).json({
    data: {
      tokeninfo: {
        accessToken,
      },
      userinfo: {
        userId: userBasicInfo.id,
        mail,
        username: userBasicInfo.username,
      },
    },
  });
};

// token verify middleware
const verifiedAuth = async (req, res, next) => {
  let token = req.body.token || req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(403).json({ msg: 'Token missing' });
  }

  // decode the token and pass
  token = token.replace(/^Bearer\s+/, '');
  const decodedJWTtoken = await UserService.verifyJWTtoken(token);
  req.user = decodedJWTtoken;

  return next();
};

// fetch user profile
const fetchUserProfile = async (req, res) => {
  const { userId } = req.user;
  const result = await UserModel.fetchUserProfile(userId);
  return res.status(200).json({ result });
};

// Verify token from frontend, and pass to create socket connection
const socketAuthVerified = async (socket, next) => {
  const connectedSocket = socket;
  const tokenFromSocket = socket.handshake.auth.token;

  const decodedJWTtoken = await UserService.verifyJWTtoken(tokenFromSocket);

  // add userinfo to socket data
  connectedSocket.userMail = decodedJWTtoken.mail;
  connectedSocket.userId = decodedJWTtoken.userId;

  next();
};

// FIXME: 待檢查
const updateNewUsername = async (req, res) => {
  const { mail } = req.user;
  const { username, organization } = req.body;
  console.log('controller', username, 'rsdf');
  if (!username) {
    return res.status(400).send("username can't be null");
  }
  try {
    const updateUserName = await UserModel.upateNewUsername(
      username,
      organization,
      mail,
    );
    console.log(updateUserName);
    if (!updateUserName) {
      return res.status(400).send('Internal Error');
    }

    res.status(200).json({
      result: 'username updated',
      newUserName: username,
      newOrganization: organization,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Internal Erro' });
  }
};

module.exports = {
  register,
  login,
  registerSchema,
  loginSchema,
  verifiedAuth,
  fetchUserProfile,
  socketAuthVerified,
  updateNewUsername,
};
