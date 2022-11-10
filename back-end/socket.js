const { Server } = require('socket.io');
const { socketAuthVerified } = require('./server/controllers/auth_controller');
const { newConnectionDealer } = require('./socketConnectDealer/newConnection');

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

    // 呼叫callback來儲存map
    newConnectionDealer(socket, io);
    // Map(1) { 'UF_8WLnn5L-kJTXgAAAB' => { userMail: 'test0001@gmail.com' } }
  });

  // TODO: save the connected socket ID Map
};

module.exports = { initialSocketServer };
