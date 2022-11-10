const serverStore = require('../serverStore');

const newDisconnectDealer = async (socket, io) => {
  console.log('socket.id(斷線處理)', socket.id);
  const disconnectSocketId = socket.id;
  serverStore.removeDisconnectedUsersFromMap(socket.id);
};

module.exports = { newDisconnectDealer };
