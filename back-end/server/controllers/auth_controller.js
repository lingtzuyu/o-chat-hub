require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { Exception } = require('../services/exceptions/exception');
const { SQLException } = require('../services/exceptions/sql_exception');

const UserModel = require('../models/auth_model');
const UserService = require('../services/auth_service');

const { TOKEN_EXPIRE, TOKEN_SECRET, BCRYPT_SALTROUND } = process.env;

// use joi and validator to validate the input (register & login)

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

// register
const register = async (req, res) => {
  const { username, mail, password } = req.body;

  if (!username || !mail || !password) {
    res.status(400).send({
      error: 'Username, email and password are required.',
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

  // FIXME: 待刪除console.log
  console.log('controller這邊接的', result);
  // call signUp to insertInto DB
  // const result = await User.signUp(username, mail, password);

  // // email already exist會進到這邊
  // if (result.error) {
  //   res.status(403).send({ error: result.error });
  //   return;
  // }

  // use Id to generate JWT token
  const userId = result;

  const accessToken = await UserService.createJWTtoken(username, mail, userId);
  // const accessToken = jwt.sign(
  //   {
  //     username,
  //     mail,
  //     userId,
  //   },
  //   TOKEN_SECRET,
  // );

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

// login邏輯
const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).send({
        error: 'Email and password are required.',
      });
    }

    const result = await UserModel.signIn(mail, password);

    const loginReturnData = {
      accessToken: result.user.accesstoken,
      lastLogin: result.user.lastlogin,
      username: result.user.username,
      userId: result.user.id,
      mail: result.user.mail,
    };
    return res.status(200).send(loginReturnData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Error');
  }
};

const verifiedAuth = async (req, res, next) => {
  let token = req.body.token || req.headers.authorization || req.query.token;
  if (!token) {
    // 403連Auth都沒過
    return res.status(403).send('Token missing');
  }

  // TODO:  confirm if try catch necessary
  try {
    // decode the token, 移除bearer
    token = token.replace(/^Bearer\s+/, '');
    const verifiedToken = jwt.verify(token, TOKEN_SECRET);
    // info for next()，這邊可以傳給下一個
    req.user = verifiedToken;
  } catch (err) {
    // 401可以進但沒權限
    return res.status(401).send('Invalid Token');
  }

  return next();
};

// TODO: 驗證前端過來的token對不對以建立後續的socket連線，若pass，則next下去
// https://www.tabnine.com/code/javascript/functions/socket.io/Handshake/query
const socketAuthVerified = (socket, next) => {
  // 等等從socket丟過來的，socket資料內確認會帶token
  // https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt
  const tokenFromSocket = socket.handshake.auth.token;
  try {
    const verifiedToken = jwt.verify(tokenFromSocket, TOKEN_SECRET);
    // 將userMail加入socket資訊裡面，之後要 Map的時候用
    // TODO: 將mail改為id增加讀取寫入效率
    socket.userMail = verifiedToken.mail;
    socket.userId = verifiedToken.userId;
    // verifiedToken=> { name: 'test0001', mail: 'test0001@gmail.com', iat: 1668010656 }
  } catch (err) {
    const socketFailed = new Error('Invalid Token');
    return next(socketFailed);
  }
  next();
};

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
  socketAuthVerified,
  updateNewUsername,
};
