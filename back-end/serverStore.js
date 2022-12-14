// TODO: 用new Map()來保留鍵值 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Map
// !!! null會變成undefined
// TODO: 想像成redis (可能之後可以存在redis?)
const connectedUsers = new Map();
let io = null;

// 使用篩選後在線上的socketId來建立
const setSocketServer = (ioServer) => {
  io = ioServer;
};

const getSocketServer = () => {
  return io;
};

// if user connect and have valid token, then save
const addNewConnectedUsersToMap = ({ socketId, userMail, userId }) => {
  //TODO: change to userID later
  connectedUsers.set(socketId, { userMail, userId });
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

// 之後改為userID (全部線上的socket ID有誰)
const getOnlineUsers = (userId) => {
  const onlineSocket = [];
  // 把global的Map抓近來
  // use ForEach loop the Map https://bobbyhadz.com/blog/javascript-iterate-map#:~:text=Use%20the%20forEach()%20method,Map%20object%20on%20each%20iteration.
  // ! forEach的第一個是value，第二個變數才是key
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      onlineSocket.push(key);
    }
  });
  return onlineSocket;
  // online socket的array，用這個去檢查線上的user有誰，並且對他觸發相關的event
};

// 取得線上的用戶 (利用socketID Map到的mail)
const fetchOnlineUserSocket = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    // object比較好處理
    onlineUsers.push({ socketId: key, userMail: value.userMail });
  });
  // console.log('fetchOnlineUserSocket內的', onlineUsers);
  return onlineUsers;
  // onlineUsers的資料
  // [
  //   { socketId: '83tDzTrbTT04cEBTAAAC', userMail: 'test0003@gmail.com' },
  //   { socketId: 'dC1W1jNr0QeBfWJEAAAX', userMail: 'test0003@gmail.com' }
  // ]
};

// 取得好友socket
// 1. 先取得自己id或是mail
// 2. 如果自己的mail在onlineUsers表內是唯一值 (最後一個連線的socket)
// 3. 取得這個id的好友名單
// 4. 取得好友名單(mail)連線中的sokcet
// 5. 發給這些socket通知

module.exports = {
  addNewConnectedUsersToMap,
  removeDisconnectedUsersFromMap,
  getOnlineUsers,
  setSocketServer,
  getSocketServer,
  fetchOnlineUserSocket,
};
