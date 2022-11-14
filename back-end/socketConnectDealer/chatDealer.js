const ChatDataMongo = require('../server/models/chat_model');
const Friend = require('../server/models/friend_model');
// 從serverStore拿該使用者連線中的socket
const serverStore = require('../serverStore');

// 拿chatId
// 把message Array取出照時間排序
// socketIdToSend，點該好友的人需要得到渲染歷史資烙後的聊天紀錄
const fetchChatContent = async (chatId, socketIdToSend = null) => {
  const chat = await ChatDataMongo.findById(
    // https://dev.to/paras594/how-to-use-populate-in-mongoose-node-js-mo0
    chatId
  ).populate({
    // 那一個path (如果是array)
    path: 'messages',
    model: 'MessageDataMongo',
    // 在把message ID populate出來
    populate: {
      path: 'sender',
    },
  });
  console.log('chat populate出來的', chat);
  // get the username later for 前端頁面
  if (chat) {
    const io = serverStore.getSocketServer();
    if (socketIdToSend) {
      return io.to(socketIdToSend).emit('directMessageHistory', {
        messages: chat.messages,
        participants: chat.participants,
      });
    }

    console.log('chat.js內', chat.participants);
    // 檢查雙方是否online，如果是，則emit (任一在線上也會觸發)
    chat.participants.forEach(async (userId) => {
      const userInfo = await Friend.checkUserInfoById(userId);
      // 這邊要用ID在轉換一次userMail
      const userMail = userInfo.userInfo.mail;
      console.log('chat.js內', userMail);
      const onlineConnections = serverStore.getOnlineUsers(userMail.toString());

      // emit event到這邊的socketID (在participants內的)
      onlineConnections.forEach((socketId) => {
        io.to(socketId).emit('directMessageHistory', {
          messages: chat.messages,
          participants: chat.participants,
        });
      });
    });
  }
};

module.exports = { fetchChatContent };
