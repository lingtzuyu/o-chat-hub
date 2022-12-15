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
  const presentFunctionName = 'checkChatExist';
  try {
    const chatExist = await ChatModel.ChatDataMongo.findOne({
      participants: { $all: [myId, targetId] },
    });
    return chatExist;
  } catch (err) {
    throw new MongoException(
      'Error when check chat exist or not, please try again',
      `Error happened when user ${myId} try to send or fetch messages`,
      'ChatDataMongo',
      'findOne',
      presentFunctionName,
    );
  }
};

const pushMessageToExistingchat = async (chatObject, messageId) => {
  const presentFunctionName = 'checkChatExist';
  try {
    chatObject.messages.push(messageId);
    await chatObject.save();
  } catch (err) {
    throw new MongoException(
      'Error when append updated messages, please try again',
      `Error happened on ${chatObject} try to append new messages`,
      'ChatDataMongo',
      'save',
      presentFunctionName,
    );
  }
};

const creatNewChatRoom = async (myId, targetId, messageId) => {
  const presentFunctionName = 'creatNewChatRoom';
  try {
    const newChat = await ChatModel.ChatDataMongo.create({
      messages: messageId,
      participants: [myId, targetId],
    });
    return newChat;
  } catch (err) {
    throw new MongoException(
      'Error when create new chat, please try again',
      `Error happened between ${myId} & ${targetId} try to start a new chat`,
      'ChatDataMongo',
      'create',
      presentFunctionName,
    );
  }
};

const fetchChatHistoryById = async (myId, targetId) => {
  const presentFunctionName = 'fetchChatHistoryById';
  try {
    const chatHistory = await ChatModel.ChatDataMongo.findOne({
      participants: { $all: [myId, targetId] },
      type: 'DIRECT',
    });
    return chatHistory;
  } catch (err) {
    throw new MongoException(
      'Error when fetch chat history, please try again',
      `Error happened between ${myId} & ${targetId} try to chat`,
      'ChatDataMongo',
      'findOne',
      presentFunctionName,
    );
  }
};

module.exports = {
  findChatContent,
  saveDirectMessageToMongo,
  checkChatExist,
  pushMessageToExistingchat,
  creatNewChatRoom,
  fetchChatHistoryById,
};
