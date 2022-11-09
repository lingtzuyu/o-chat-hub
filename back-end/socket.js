const socketAuthVerified = require('./server/controllers/auth_controller');
const newConnectionHandler = require('./socketConnectDealer/newConnection');
const { Server } = require('socket.io');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });
  io.use((socket, next) => {
    socketAuthVerified(socket, next);
  });
  io.on('connection', (socket) => {
    console.log('a user is connected', socket.id);

    // TODO: 連線上後，通知廣播上線
    newConnectionHandler(socket, io);
  });
};

module.exports = { initialSocketServer };
