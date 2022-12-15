require('dotenv').config();
const Friends = require('../server/models/friend_model');
const UserModel = require('../server/models/auth_model');

// 取得儲存socket ID及mail的Map()變數
const serverStore = require('../serverStore');
// 透過socket.js這邊的event來發送實實資料 (React重新渲染畫面上的pending邀請)

// 使用userId來尋找friendinvitation表
const updateInvitations = async (receiverId) => {
  try {
    // 撈一次sql資料
    const pendingInvitations = await Friends.checkPendingInvitationByReceiver(
      receiverId,
    );
    // console.log('pendingInvitations here 1', pendingInvitations);
    // console.log(`pending邀請的資料`, pendingInvitations);
    // 如果這個receiverId (現在因當初的設計錯誤改成用mail)的人在線上，則用這些資料渲染他的畫面
    // 抓global Map => connetedUsers (in serverStore.js)
    // TODO:  之後換成userID來取資料
    // const receiverSockets = serverStore.getOnlineUsers(receiverMail);
    const receiverSockets = serverStore.getOnlineUsers(receiverId);

    const io = serverStore.getSocketServer();

    // console.log('該reciever有用哪幾條socket連線', receiverSockets);
    // => [ 'Ia3lKVB5d19XxsynAAAF', 'S-KhERp1enEME8CzAAAJ' ]

    // 發到該socket通道
    receiverSockets.forEach((socketId) => {
      // 傳送已連線且是該receiver的socket id
      // 觸發事件friendInvitations (socketConenctionClient.js中)
      // 資料把剛剛SQL friendinvitation撈出來的宋過去
      io.to(socketId).emit('friendInvitations', {
        pendingInvitations: pendingInvitations || [],
      });
    });
  } catch (err) {
    console.log('error from updateInvitation:', err);
  }
};

// TODO: 這邊也改成userId會比較好
const updateFriendList = async (userId) => {
  try {
    // 確認該用戶(userMail)是否上線
    // 有哪些socket是這個用戶在連線的
    // const userId = await Friends.checkUserExist(userMail);
    const connetedSocketsByuserMail = serverStore.getOnlineUsers(userId);
    // console.log('updateFriendList來的', connetedSocketsByuserMail);
    console.log('updateChatStatus', connetedSocketsByuserMail);
    // 根據userId sorting 出 id, username, mail
    // [{id:1, username: test0001, mail: test0001@gmail.com},{},{}]
    // userMail需要從token解出來確保資安

    // 該使用者確(userMail)實有在任一的分頁或是裝置上登入才會開始query DB
    if (connetedSocketsByuserMail.length > 0) {
      // 1. 拿此id去friendship取出所有的好友id，沒好友就是空陣列
      const friendListById = await Friends.fetchFriendList(userId);
      // console.log('updateFriendList來的好友名單', friendListById);
      // 這邊的friendListById資料會是 [ { friend: 66 }, { friend: 68} ]
      // 2. 用id去Users的table去抓 username
      // how to use asycn in map: https://zhuanlan.zhihu.com/p/134239237

      // TODO: 待合併
      const friendInfoList = await Promise.all(
        friendListById.map(async (friendId) => {
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
      // console.log('後端updateChatStatus.js送的好友資料', friendInfoList);

      // 建立io server準備發送相關event
      const io = serverStore.getSocketServer();

      // 這個使用者開了哪些分頁，分別是什麼socketId
      connetedSocketsByuserMail.forEach((userSocketId) => {
        io.to(userSocketId).emit('friendListUpdate', {
          friends: friendInfoList,
        });
      });
    }
  } catch (err) {
    console.log('Error in update friend list', err);
  }
};

module.exports = { updateInvitations, updateFriendList };

//TODO:  to socket_friends_controller
