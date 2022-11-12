const serverStore = require('../serverStore');
const { updateInvitations } = require('./updateChatStatus');
const Friend = require('../server/models/friend_model');

const newConnectionDealer = async (socket, io) => {
  serverStore.addNewConnectedUsersToMap({
    socketId: socket.id,
    // 這個userMail在auth_controller那邊解jwt token的時候會放進去
    userMail: socket.userMail,
  });
  console.log(`可以從socket拿到userMail`, socket.userMail);

  const userIdCheck = await Friend.checkUserExist(socket.userMail);
  const userId = userIdCheck[0].id;

  // update pending invitation from table friendinvitation
  // 拿updateChatStatus.updateInvitations, 裡面的Friends.checkPendingInvitationByReceiver會去sqlDB要
  // updateInvitations裡面會再去觸發一次檢查連線者有哪些socket ID，撈DB...etc.
  await updateInvitations(socket.userMail, userId);
};

module.exports = { newConnectionDealer };
