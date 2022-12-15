const socketMap = require('../socket_map');

const {
  updatePendingInvitationList,
  updateFriendList,
} = require('./socket_friends_controller');

const newDisconnectHandler = async (socket) => {
  socketMap.removeDisconnectedUsersFromMap(socket.id);
};

const newConnectionHandler = async (socket) => {
  socketMap.addNewConnectedUsersToMap({
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
