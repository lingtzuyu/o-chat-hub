const SocketChatModel = require('../models/socket_chat_model');

const serverStore = require('../../serverStore');

const fetchChatContent = async (chatId, socketIdToSend = null) => {
  const chatHistory = await SocketChatModel.findChatContent(chatId);

  // if have chat history
  if (chatHistory) {
    const io = serverStore.getSocketServer();
    // if related sockets online (not null)
    if (socketIdToSend) {
      return io.to(socketIdToSend).emit('directMessageHistory', {
        messages: chatHistory.messages,
        participants: chatHistory.participants,
      });
    }

    console.log('chatHistory', chatHistory);
    // check participants
    chatHistory.participants.forEach(async (userId) => {
      // get related socket ids
      const onlineConnections = serverStore.getOnlineUsers(userId);

      onlineConnections.forEach((socketId) => {
        io.to(socketId).emit('directMessageHistory', {
          messages: chatHistory.messages,
          participants: chatHistory.participants,
        });
      });
    });
  }
};

module.exports = { fetchChatContent };
