// TODO: 用new Map()來保留鍵值 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Map
// !!! null會變成undefined
const connectedUsers = new Map();

// if user connect and have valid token, then save
const addNewConnectedUsers = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log('check connected Users', connectedUsers);
};

module.exports = { addNewConnectedUsers };
