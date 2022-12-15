const ChatModel = require('../../server/models/chat_model');
const MessageModel = require('../../server/models/message_model');

const MongoException = require('../../server/services/exceptions/mongo_exception');

const findChatContent = async (chatId) => {
  const presentFunctionName = 'findChatContent';
  try {
    const chat = await ChatModel.ChatDataMongo.findById(chatId).populate({
      path: 'messages',
      model: 'MessageDataMongo',
      populate: {
        path: 'sender',
      },
    });
    return chat;
  } catch (err) {
    throw new MongoException(
      'Error when querying mongoDB, please try again',
      `Error happened when querying${chatId}`,
      'ChatDataMongo',
      'findById',
      presentFunctionName,
    );
  }
};

const saveDirectMessageToMongo = async (userId, userMail, content, date) => {
  const presentFunctionName = 'saveDirectMessageToMongo';
  try {
    const message = await MessageModel.MessageDataMongo.create({
      sender: userId,
      senderMail: userMail,
      body: content,
      date,
      type: 'DIRECT',
    });
    return message;
  } catch (err) {
    throw new MongoException(
      'Error when save message to DB, please try again',
      `Error happened when user ${userId} try to send messages`,
      'MessageDataMongo',
      'create',
      presentFunctionName,
    );
  }
};

const checkChatExist = async (myId, targetId) => {
  const chatExist = await ChatModel.ChatDataMongo.findOne({
    participants: { $all: [myId, targetId] },
  });
  return chatExist;
};

const pushMessageToExistingchat = async (chatObject, messageId) => {
  chatObject.messages.push(messageId);
  await chatObject.save();
};

const creatNewChatRoom = async (myId, targetId, messageId) => {
  const newChat = await ChatModel.ChatDataMongo.create({
    messages: messageId,
    participants: [myId, targetId],
  });
  return newChat;
};

module.exports = {
  findChatContent,
  saveDirectMessageToMongo,
  checkChatExist,
  pushMessageToExistingchat,
  creatNewChatRoom,
};
