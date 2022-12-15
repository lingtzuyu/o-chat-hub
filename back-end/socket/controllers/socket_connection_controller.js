const serverStore = require('../../serverStore');

const {
  updatePendingInvitationList,
  updateFriendList,
} = require('./socket_friends_controller');

const newDisconnectHandler = async (socket, io) => {
  serverStore.removeDisconnectedUsersFromMap(socket.id);
};

const newConnectionHandler = async (socket, io) => {
  serverStore.addNewConnectedUsersToMap({
    socketId: socket.id,
    userMail: socket.userMail,
    userId: socket.userId,
  });

  // update invitations of this user
  await updatePendingInvitationList(socket.userId);

  // update friend list
  await updateFriendList(socket.userId);
};

module.exports = { newDisconnectHandler, newConnectionHandler };
