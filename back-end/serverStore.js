// TODO: 用new Map()來保留鍵值 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Map
// !!! null會變成undefined
// TODO: 想像成redis (可能之後可以存在redis?)
const connectedUsers = new Map();

// if user connect and have valid token, then save
const addNewConnectedUsersToMap = ({ socketId, userMail }) => {
  //TODO: change to userID later
  connectedUsers.set(socketId, { userMail });
  console.log('new connceted: ', connectedUsers);
};

// TODO: 設計機制剃除 => 有時間可能可以做進階一點的heartbeat?
// Map.delete(key) => https://www.geeksforgeeks.org/map-delete-javascript/#:~:text=The%20Map.,that%20key%20and%20returns%20true.
const removeDisconnectedUsersFromMap = (socketId) => {
  console.log('A user disconnected', connectedUsers.get(socketId));
  if (connectedUsers.get(socketId) !== undefined) {
    connectedUsers.delete(socketId);
  }
  console.log('after DC', connectedUsers);
};

module.exports = { addNewConnectedUsersToMap, removeDisconnectedUsersFromMap };
