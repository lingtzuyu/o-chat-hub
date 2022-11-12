const { Server } = require('socket.io');
const { socketAuthVerified } = require('./server/controllers/auth_controller');
const { newConnectionDealer } = require('./socketConnectDealer/newConnection');
const { newDisconnectDealer } = require('./socketConnectDealer/newDisconnect');
const serverStore = require('./serverStore');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  // set socketServer (每次建立一個sockerServer，就觸發)
  serverStore.setSocketServer(io);

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

    // 在這個io.on監聽connection event之下，我也監聽每一個socket的斷線
    // 1. 從Map中剔除
    // 2. 啟動後續斷線邏輯 (ex. online => offline indicator)
    socket.on('disconnect', () => {
      console.log('a user disconnected');
      newDisconnectDealer(socket);
    });
  });

  // TODO: save the connected socket ID Map
};

module.exports = { initialSocketServer };
