const SocketChatModel = require('../models/socket_chat_model');

const SocketException = require('../../server/services/exceptions/socket_exception');

const SocketMap = require('../socket_map');

const fetchChatContent = async (chatId, socketIdToSend = null) => {
  const presentFunctionName = 'fetchChatContent';
  try {
    const chatHistory = await SocketChatModel.findChatContent(chatId);

    // if have chat history
    if (chatHistory) {
      const io = SocketMap.getSocketServer();
      // if related sockets online (not null)
      if (socketIdToSend) {
        return io.to(socketIdToSend).emit('directMessageHistory', {
          messages: chatHistory.messages,
          participants: chatHistory.participants,
        });
      }

      // check participants
      chatHistory.participants.forEach(async (userId) => {
        // get related socket ids
        const onlineConnections = SocketMap.getOnlineUsers(userId);

        onlineConnections.forEach((socketId) => {
          io.to(socketId).emit('directMessageHistory', {
            messages: chatHistory.messages,
            participants: chatHistory.participants,
          });
        });
      });
    }
  } catch (err) {
    throw new SocketException(
      'Error when fetch content from db, please try again',
      'Error when fetch content',
      500,
      'directMessageHistory',
      presentFunctionName,
    );
  }
};

module.exports = { fetchChatContent };
