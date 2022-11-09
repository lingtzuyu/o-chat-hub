const serverStore = require('../serverStore');

const newConnectionHandler = async (socket, io) => {
  // 這邊JWT已經把socket decode了，所以可以這樣拿到userInfo
  const userInfo = socket.user;

  serverStore.addNewConnectedUsers({
    socketId: socket.id,
    userId: userInfo.userId,
  });
};

module.exports = { newConnectionHandler };
