// TODO: 用new Map()來保留鍵值 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Map
// !!! null會變成undefined
// 想像成redis
const connectedUsers = new Map();

// if user connect and have valid token, then save
const addNewConnectedUsersToMap = ({ socketId, userMail }) => {
  //TODO: change to userID later
  connectedUsers.set(socketId, { userMail });
  console.log(connectedUsers);
};

// TODO: 不用設計機制剃除，因為在socket.js連線的時候都會掃過一次來製作這個Map，有時候有，有時候沒，可能是socket斷掉的時間 => 可能可以做heartbeat?

module.exports = { addNewConnectedUsersToMap };
