const UserService = require('../../server/services/auth_service');

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

module.exports = { socketAuthVerified };
