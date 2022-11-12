require('dotenv').config();
const { sqlDB } = require('./mysqlconn');

// 確認用戶是否存在
const checkUserExist = async (mail) => {
  const checkUserQuery = 'SELECT id FROM user WHERE mail = ?';
  const [result] = await sqlDB.query(checkUserQuery, mail);
  console.log('model', result);
  return result;
};

const sendFriendRequest = async (senderId, receiverId) => {
  const conn = await sqlDB.getConnection();

  const sendTime = new Date();

  // 0 is pending, 1 is accepted
  const initialStatus = 0;

  try {
    const insertInviteQuery =
      'INSERT INTO friendinvitation SET sender_user_id = ?, receiver_user_id = ?, status = ?, sendtime = ?';
    const [result] = await conn.query(insertInviteQuery, [
      senderId,
      receiverId,
      initialStatus,
      sendTime,
    ]);
    return result;
  } catch (err) {
    return {
      error: 'Internal Error SQL',
      status: 500,
    };
  } finally {
    await conn.release();
  }
};

// TODO: 缺少拒絕後重新申請的判斷 (靠status)
// 確認pending Invitations
const checkPendingInvitation = async (senderId, receiverId) => {
  const invitationQuery =
    'SELECT * FROM friendinvitation WHERE sender_user_id = ? AND receiver_user_id = ? AND status = 0';
  const [result] = await sqlDB.query(invitationQuery, [senderId, receiverId]);
  return result;
};

// receiver 視角，渲染登入的時候有哪些好友邀請
const checkPendingInvitationByReceiver = async (receiverId) => {
  // join friendinvitation以及user table直接找出送給這個receiverID的人有哪些info
  const invitationQuery =
    'SELECT friendinvitation.sender_user_id, user.username, user.mail FROM friendinvitation JOIN user on friendinvitation.sender_user_id = user.id WHERE receiver_user_id = ? AND status = 0';
  const [result] = await sqlDB.query(invitationQuery, [receiverId]);
  return result;
};

// check user info by ID
const checkUserInfoById = async (userId) => {
  const userQuery = 'SELECT username, mail, FROM user WHERE id = ?';
  const [result] = await sqlDB.query(userQuery, [userId]);
  const userInfo = {
    username: result[0].username,
    mail: result[0].mail,
    id: userId,
  };
  return { userInfo };
};

// 取得全部的DB
const getAllFriendshipFromDB = async (userId) => {
  const friendshipQuery = 'SELECT friend FROM friendship WHERE user = ?';
  const [result] = await sqlDB.query(friendshipQuery, userId);
  const friendList = result.map((ele) => ele.friend);
  // 這會return像這樣的array => [ 66, 47 ]
  return friendList;
};

// 加快讀取速度，只鎖定senderId(user)以及receiverId(friend)
const getTargetFriendFromDB = async (senderId, receiverId) => {
  const friendshipQuery =
    'SELECT * FROM friendship WHERE user = ? AND friend = ?';
  const [result] = await sqlDB.query(friendshipQuery, [senderId, receiverId]);
  // 這會return像這樣的array => [ 66, 47 ]
  return result;
};

module.exports = {
  checkUserInfoById,
  checkPendingInvitationByReceiver,
  checkUserExist,
  sendFriendRequest,
  checkPendingInvitation,
  getAllFriendshipFromDB,
  getTargetFriendFromDB,
};
