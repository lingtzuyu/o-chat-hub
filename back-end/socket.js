require('dotenv').config();
const { Server } = require('socket.io');

const {
  socketAuthVerified,
} = require('./socket/controllers/socket_auth_controller');
const {
  newDisconnectHandler,
  newConnectionHandler,
} = require('./socket/controllers/socket_connection_controller');

const { newConnectionDealer } = require('./socketConnectDealer/newConnection');
const { newDisconnectDealer } = require('./socketConnectDealer/newDisconnect');
const {
  directMessageDealer,
} = require('./socketConnectDealer/directMessageDealer');

const {
  directMessageHandler,
} = require('./socket/controllers/socket_chat_controller');

const {
  directMessageHistoryDealer,
} = require('./socketConnectDealer/directMessageHistoryDealer');
const serverStore = require('./serverStore');

const initialSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  serverStore.setSocketServer(io);

  // middleware for verify socket
  io.use((socket, next) => {
    socketAuthVerified(socket, next);
  });

  const broadcastOnlineUser = () => {
    const onlineUsers = serverStore.fetchOnlineUserSocket();
    // console.log('socketServer這邊的', onlineUsers);
    // io.emit會廣撥給全部線上的
    io.emit('onlineUsers', { onlineUsers });
    // TODO: set event "onlineUsers" in react socket connection
  };

  // const broadcastOnlineUserIfFriend = () => {
  //   const onlineUsers = serverStore.fetchOnlineUserSocket();
  //   // console.log('socketServer這邊的', onlineUsers);
  //   // io.emit會廣撥給全部線上的
  //   io.emit('onlineUsers', { onlineUsers });
  //   // TODO: set event "onlineUsers" in react socket connection
  // };

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // 呼叫callback來儲存map
    newConnectionHandler(socket, io);
    // user一上線就call一次盤點誰在線上
    broadcastOnlineUser();
    // Map(1) { 'UF_8WLnn5L-kJTXgAAAB' => { userMail: 'test0001@gmail.com' } }

    // 接收directMessage事件
    socket.on('directMessage', (data) => {
      directMessageHandler(socket, data);
    });

    // 取得聊天資料
    socket.on('directMessageHistory', (data) => {
      // receiverUserId
      console.log('後端directMessageHistory', data);
      // 使用者
      // console.log('後端directMessageHistory', socket);

      directMessageHistoryDealer(socket, data);
    });

    // 在這個io.on監聽connection event之下，我也監聽每一個socket的斷線
    // 1. 從Map中剔除
    // 2. 啟動後續斷線邏輯 (ex. online => offline indicator)
    socket.on('disconnect', () => {
      console.log('a user disconnected');
      newDisconnectHandler(socket);
      // setInterval(() => {
      //   broadcastOnlineUser();
      // }, process.env.SOCKET_BRAODCAST);
    });
  });

  // FIXME: 每隔10秒廣播全線上用戶
  setInterval(() => {
    broadcastOnlineUser();
  }, process.env.SOCKET_BRAODCAST);

  // TODO: save the connected socket ID Map
};

module.exports = { initialSocketServer };
