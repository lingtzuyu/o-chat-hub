require('dotenv').config();

const FriendsModel = require('../../server/models/friend_model');
const UserModel = require('../../server/models/auth_model');
const serverStore = require('../../serverStore');

const updatePendingInvitationList = async (receiverId) => {
  // get list from sql db
  const pendingInvitations =
    await FriendsModel.checkPendingInvitationByReceiver(receiverId);

  // get these recievers online sockets
  const receiverSockets = serverStore.getOnlineUsers(receiverId);

  const io = serverStore.getSocketServer();

  receiverSockets.forEach((socketId) => {
    io.to(socketId).emit('friendInvitations', {
      pendingInvitations: pendingInvitations || [],
    });
  });
};

const updateFriendList = async (userId) => {
  // how many sockets alive by userId in array
  const connectedSocketsByUser = serverStore.getOnlineUsers(userId);

  if (connectedSocketsByUser.length > 0) {
    // fetch friends list by this id
    const friendsListById = await FriendsModel.fetchFriendList(userId);
    const friendInfoList = await Promise.all(
      friendsListById.map(async (friendId) => {
        const detailFriendInfoList = await UserModel.fetchUserProfile(
          friendId.friend,
        );

        return {
          id: detailFriendInfoList.id,
          username: detailFriendInfoList.username,
          mail: detailFriendInfoList.mail,
          photo: detailFriendInfoList.photo,
          organization: detailFriendInfoList.organization,
        };
      }),
    );

    // emit to connected receiver's socket id
    const io = serverStore.getSocketServer();

    connectedSocketsByUser.forEach((userSocketId) => {
      io.to(userSocketId).emit('friendListUpdate', { friends: friendInfoList });
    });
  }
};

module.exports = { updatePendingInvitationList, updateFriendList };
