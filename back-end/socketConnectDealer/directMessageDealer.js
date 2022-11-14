const MessageDataMongo = require('../server/models/message_model');
const ChatDataMongo = require('../server/models/chat_model');
const Friend = require('../server/models/friend_model');

const directMessageDealer = async (socket, data) => {
  // 1. 從serverStore獲取這個用戶有哪些連線中的socket通道

  try {
    const { userMail } = socket;
    //TODO: 這邊一樣，還要從userMail解出userID
    // 一開始就存userID就好，待改
    const { receiverId, content } = data;
    const checkIdByMail = await Friend.checkUserExist(userMail);
    const userId = checkIdByMail[0].id;
    // console.log('前端傳來的message data', socket);
    // console.log('前端傳來的message data', data);

    const message = await MessageDataMongo.create({
      sender: userId,
      body: content,
      date: new Date(),
      type: 'DIRECT',
    });
    // 把message push 到對話裡面
    // 用chatExist來查找是否存在相關對話
    // 使用 $addToSet來保證不會重複插入userId
    // https://stackoverflow.com/questions/36518635/avoid-a-duplicate-value-when-i-update-array-using-push-on-mongodb
    const chatExist = await ChatDataMongo.findOne({
      // 用$all 找不會管先後順序
      participants: { $all: [userId, receiverId] },
    });

    // 直接用上面findone後的來push就好，減少一次db query
    if (chatExist) {
      chatExist.messages.push(message._id);
      await chatExist.save();
      // TODO: 用socket event來發送即時訊息
    } else {
      // 建立新的chat document
      const newChat = await ChatDataMongo.create({
        messages: [message._id],
        participants: [userId, receiverId],
      });
      // TODO: 用socket event來發送即時訊息
    }
  } catch (err) {
    console.log('error from socket directMessageDealer', err);
  }
};

module.exports = { directMessageDealer };
