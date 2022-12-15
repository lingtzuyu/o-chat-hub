const SocketChatService = require('../services/socket_chat_service');

const SocketChatModel = require('../models/socket_chat_model');
const { Socket } = require('socket.io');

const directMessageHandler = async (socket, data) => {
  const { userId, userMail } = socket;
  const { receiverId, content } = data;
  const currentTime = new Date();

  // save messges
  const message = await SocketChatModel.saveDirectMessageToMongo(
    userId,
    userMail,
    content,
    currentTime,
  );

  const chatObject = await SocketChatModel.checkChatExist(userId, receiverId);

  if (chatObject) {
    await SocketChatModel.pushMessageToExistingchat(chatObject, message.id);

    console.log('chatObj', chatObject);
    // emit message to related online users
    await SocketChatService.fetchChatContent(chatObject.id.toString());
  } else {
    // create new chat document
    const newChat = await SocketChatModel.creatNewChatRoom(
      userId,
      receiverId,
      message.id,
    );

    await SocketChatService.fetchChatContent(newChat.id.toSttring());
  }
};

module.exports = { directMessageHandler };
