const ChatDataMongo = require('../server/models/chat_model');
const Friend = require('../server/models/friend_model');
const chatDealer = require('./chatDealer');

const directMessageHistoryDealer = async (socket, data) => {
  try {
    const { userMail } = socket;
    //TODO: 這邊一樣，還要從userMail解出userID
    // 一開始就存userID就好，待改
    const { receiverUserId } = data;
    console.log('receiverId in socketConnDealer', receiverUserId);
    const checkIdByMail = await Friend.checkUserExist(userMail);
    const userId = checkIdByMail[0].id;

    const chat = await ChatDataMongo.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });
    // 確認搜得出mongoDB，如果沒有相關聊天紀錄的話是null
    console.log('該聊天室', chat);
    console.log('該聊天室編號', chat?._id.toString());

    // 如果歷史紀錄存在於MONGODB
    if (chat !== undefined || chat != null) {
      chatDealer.fetchChatContent(chat._id.toString(), socket.id);
    }
  } catch (err) {
    console.log('directMessageHistoryDealer出錯', err);
  }
};

module.exports = { directMessageHistoryDealer };
