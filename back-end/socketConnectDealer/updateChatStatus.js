// TODO: 1. 新訊息 2. 上線狀態 3. 好友邀請
const Friends = require('../server/models/friend_model');
// 取得儲存socket ID及mail的Map()變數
const serverStore = require('../serverStore');
// 透過socket.js這邊的event來發送實實資料 (React重新渲染畫面上的pending邀請)

// 使用userId來尋找friendinvitation表
const updateInvitations = async (receiverMail, receiverId) => {
  try {
    // 撈一次sql資料
    const pendingInvitations = await Friends.checkPendingInvitationByReceiver(
      receiverId
    );
    console.log(`pending邀請的資料`, pendingInvitations);
    // 如果這個receiverId (現在因當初的設計錯誤改成用mail)的人在線上，則用這些資料渲染他的畫面
    // 抓global Map => connetedUsers (in serverStore.js)
    // TODO:  之後換成userID來取資料
    const receiverSockets = serverStore.getOnlineUsers(receiverMail);

    const io = serverStore.getSocketServer();

    console.log('該reciever有用哪幾條socket連線', receiverSockets);
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

module.exports = { updateInvitations };
