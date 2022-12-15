const connectedUsers = new Map();
let io = null;

const setSocketServer = (ioServer) => {
  io = ioServer;
};

const getSocketServer = () => io;
// if user connect and have valid token, then save
const addNewConnectedUsersToMap = ({ socketId, userMail, userId }) => {
  connectedUsers.set(socketId, { userMail, userId });
  console.log('new connceted: ', connectedUsers);
};

const removeDisconnectedUsersFromMap = (socketId) => {
  if (connectedUsers.get(socketId) !== undefined) {
    connectedUsers.delete(socketId);
  }
  console.log('after DC', connectedUsers);
};

// active socket id online
const getOnlineUsers = (userId) => {
  const onlineSocket = [];
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      onlineSocket.push(key);
    }
  });
  return onlineSocket;
};

const fetchOnlineUserSocket = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userMail: value.userMail });
  });

  return onlineUsers;
};

module.exports = {
  addNewConnectedUsersToMap,
  removeDisconnectedUsersFromMap,
  getOnlineUsers,
  setSocketServer,
  getSocketServer,
  fetchOnlineUserSocket,
};
