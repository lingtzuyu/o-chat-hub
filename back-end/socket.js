const { Server } = require('socket.io');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  });
};

module.exports = { initialSocketServer };
