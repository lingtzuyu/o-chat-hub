const { Server } = require('socket.io');
const { socketAuthVerified } = require('./server/controllers/auth_controller');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  // io.use來接middleware (ex. auth): https://socket.io/docs/v4/middlewares/
  // TODO: 這邊可做rate limiter
  io.use((socket, next) => {
    socketAuthVerified(socket, next);
  });

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
  });

  // TODO: save the connected socket ID
};

module.exports = { initialSocketServer };
