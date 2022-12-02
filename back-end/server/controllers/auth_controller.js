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
  username: Joi.string().min(3).max(20).required(),
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
    res.status(400).send('Error, please check input format');
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
    // verifiedToken=> { name: 'test0001', mail: 'test0001@gmail.com', iat: 1668010656 }
  } catch (err) {
    const socketFailed = new Error('Invalid Token');
    return next(socketFailed);
  }
  next();
};

const updateNewUsername = async (req, res) => {
  const { mail } = req.user;
  const { username } = req.body;
  console.log('controller', username, 'rsdf');
  if (!username) {
    return res.status(400).send("username can't be null");
  }
  try {
    const updateUserName = await User.upateNewUsername(username, mail);
    console.log(updateUserName);
    if (!updateUserName) {
      return res.status(400).send('Internal Error');
    }

    res.status(200).json({ result: 'username updated', newUserName: username });
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
