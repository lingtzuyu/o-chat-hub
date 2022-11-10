const serverStore = require('../serverStore');

const newConnectionDealer = async (socket, io) => {
  serverStore.addNewConnectedUsersToMap({
    socketId: socket.id,
    // 這個userMail在auth_controller那邊解jwt token的時候會放進去
    userMail: socket.userMail,
  });
  console.log(`可以從socket拿到userMail`, socket.userMail);
};

module.exports = { newConnectionDealer };
