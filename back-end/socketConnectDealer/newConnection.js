const serverStore = require('../serverStore');

// const { updateInvitations, updateFriendList } = require('./updateChatStatus');

const {
  updatePendingInvitationList,
  updateFriendList,
} = require('../socket/controllers/socket_friends_controller');
const Friend = require('../server/models/friend_model');

const newConnectionDealer = async (socket, io) => {
  serverStore.addNewConnectedUsersToMap({
    socketId: socket.id,
    // 這個userMail在auth_controller那邊解jwt token的時候會放進去
    userMail: socket.userMail,
    userId: socket.userId,
  });
  // console.log(`可以從socket拿到userMail`, socket.userMail);

  const userIdCheck = await Friend.checkUserExist(socket.userMail);
  const userId = userIdCheck;

  // update pending invitation from table friendinvitation
  // 拿updateChatStatus.updateInvitations, 裡面的Friends.checkPendingInvitationByReceiver會去sqlDB要
  // updateInvitations裡面會再去觸發一次檢查連線者有哪些socket ID，撈DB...etc.
  await updatePendingInvitationList(userId);
  // update 好友名單給這個userMail (這個mail有在哪幾條socket ID會在updateFriendList這個functions內包)
  await updateFriendList(socket.userId);
};

module.exports = { newConnectionDealer };

// TODO: 已搬到socket-connection-controller
