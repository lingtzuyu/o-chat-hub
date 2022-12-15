require('dotenv').config();
const { Server } = require('socket.io');

const SocketAuthController = require('./socket/controllers/socket_auth_controller');
const SocketConnectionController = require('./socket/controllers/socket_connection_controller');
const SocketChatController = require('./socket/controllers/socket_chat_controller');

const serverStore = require('./serverStore');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  serverStore.setSocketServer(io);

  // middleware for verify socket
  io.use((socket, next) => {
    SocketAuthController.socketAuthVerified(socket, next);
  });

  const broadcastOnlineUser = () => {
    const onlineUsers = serverStore.fetchOnlineUserSocket();
    io.emit('onlineUsers', { onlineUsers });
  };

  io.on('connection', (socket) => {
    // register socket to map
    SocketConnectionController.newConnectionHandler(socket, io);
    // user一上線就call一次盤點誰在線上
    broadcastOnlineUser();

    socket.on('directMessage', (data) => {
      SocketChatController.directMessageHandler(socket, data);
    });
    socket.on('directMessageHistory', (data) => {
      SocketChatController.directMessageHistoryHandler(socket, data);
    });

    socket.on('disconnect', () => {
      SocketConnectionController.newDisconnectHandler(socket);
    });
  });

  // heatbeat
  setInterval(() => {
    broadcastOnlineUser();
  }, process.env.SOCKET_BRAODCAST);
};

module.exports = { initialSocketServer };
