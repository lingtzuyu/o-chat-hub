require('dotenv').config();
const { sqlDB } = require('./mysqlconn');
const { SQLException } = require('../services/exceptions/sql_exception');
const { Exception } = require('../services/exceptions/exception');

// check if user exist by mail
const checkUserExist = async (mail) => {
  const presentFunctionName = 'checkUserExist';
  try {
    const checkUserQuery = `SELECT id 
    FROM user 
    WHERE mail = ?`;
    const [result] = await sqlDB.execute(checkUserQuery, [mail]);
    const userId = result[0]?.id;
    return userId;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error for the query user request, input mail: ${mail}`,
      presentFunctionName,
    );
  }
};

// check friendship already exist
const getTargetFriendFromDB = async (senderId, receiverId) => {
  const presentFunctionName = 'getTargetFriendFromDB';
  try {
    const friendshipQuery = `SELECT * 
        FROM friendship 
        WHERE user = ? AND friend = ?`;
    const [result] = await sqlDB.execute(friendshipQuery, [
      senderId,
      receiverId,
    ]);
    // 這會return像這樣的array => [ 66, 47 ]
    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error for the query user request, input mail: senderId: ${senderId}, receiverId: ${receiverId}`,
      presentFunctionName,
    );
  }
};

// check pending invitation exist in friendinvitatoin table
const checkPendingInvitation = async (senderId, receiverId) => {
  const presentFunctionName = 'checkPendingInvitation';
  try {
    const invitationQuery = `SELECT * 
      FROM friendinvitation 
      WHERE sender_user_id = ? AND receiver_user_id = ? `;
    const [result] = await sqlDB.execute(invitationQuery, [
      senderId,
      receiverId,
    ]);

    return result;
  } catch (err) {
    throw new Exception(
      'Internal error',
      `Unknow error for the query user request, input mail: senderId: ${senderId}, receiverId: ${receiverId}`,
      presentFunctionName,
    );
  }
};

// send Friend request
const sendFriendRequest = async (senderId, receiverId, sendTime) => {
  try {
    const insertInviteQuery = `INSERT INTO friendinvitation 
        SET sender_user_id = ?, receiver_user_id = ?, sendtime = ?`;
    const [result] = await sqlDB.execute(insertInviteQuery, [
      senderId,
      receiverId,
      sendTime,
    ]);
    return result;
  } catch (err) {
    throw new SQLException(
      'Error when send friend invitation, please try again',
      'Error occured when sending friend invitation',
      'friendinvitation',
      'insert',
      'sendFriendRequest',
    );
  }
};

// accept friend and insert DB
const insertDualFriendship = async (senderId, receiverId) => {
  const conn = await sqlDB.getConnection();
  const insertFriendshipQuery = `INSERT INTO friendship 
      SET user = ?, friend = ?`;

  const updateFriendInvitationStatus = `DELETE FROM friendinvitation 
      WHERE sender_user_id = ? AND receiver_user_id = ? `;
  try {
    await conn.query('START TRANSACTION');
    await conn.query(insertFriendshipQuery, [senderId, receiverId]);
    await conn.query(insertFriendshipQuery, [receiverId, senderId]);

    // delete data from friendinvitation table
    await conn.query(updateFriendInvitationStatus, [senderId, receiverId]);
    await conn.query('COMMIT');
    return true;
  } catch (err) {
    await conn.query('ROLLBACK');
    throw new SQLException(
      'Error when accept friends, please try again',
      'Error occured when transaction while adding friends',
      'friendship',
      'insert',
      'insertDualFriendship',
    );
  } finally {
    conn.release();
  }
};

// reject friend invitation and delete data in table
const deleteRejectedFriendship = async (rejectId, rejectorId) => {
  try {
    const deleteFirendInviteQuery = `DELETE FROM friendinvitation 
        WHERE sender_user_id = ? AND receiver_user_id = ?`;
    const [result] = await sqlDB.query(deleteFirendInviteQuery, [
      rejectId,
      rejectorId,
    ]);
    return result;
  } catch (err) {
    throw new SQLException(
      'Error when reject friends, please try again',
      'Error occured when deleteFirendInviteQuery',
      'friendinvitation',
      'delete',
      'deleteRejectedFriendship',
    );
  }
};

// Join friendship and user to get info
const getFriendUserName = async (userId, friendId) => {
  try {
    const friendNameQuery = `SELECT user.id, user.username 
        FROM user 
        JOIN friendship ON user.id = friendship.friend 
        WHERE friendship.user = ? AND friendship.friend = ?`;
    const [result] = await sqlDB.execute(friendNameQuery, [userId, friendId]);
    return result;
  } catch (err) {
    throw new SQLException(
      'Error, please try again',
      'Error occured when query user and friendship join table',
      'user',
      'select',
      'getFriendUserName',
    );
  }
};

// receiver perspective, check who send invitation to me
const checkPendingInvitationByReceiver = async (receiverId) => {
  // get related photo, mail of sender

  try {
    const invitationQuery = `
  SELECT 
    friendinvitation.sender_user_id, user.username, user.mail, user.photo 
  FROM 
    friendinvitation 
  JOIN user on friendinvitation.sender_user_id = user.id 
  WHERE receiver_user_id = ?`;
    const [result] = await sqlDB.execute(invitationQuery, [receiverId]);

    return result;
  } catch (err) {
    throw new SQLException(
      'Error to fetch data for invitaion list, please try again',
      'Error occured when query user and friendinvitation join table',
      'friendinvitation',
      'select',
      'checkPendingInvitationByReceiver',
    );
  }
};

// update friend list
const fetchFriendList = async (userId) => {
  try {
    const friendListQuery = `SELECT friend 
      FROM friendship 
      WHERE user = ?`;
    const [friendListById] = await sqlDB.execute(friendListQuery, [userId]);
    return friendListById;
  } catch (err) {
    throw new SQLException(
      'Error to fetch data for friend list, please try again',
      'Error occured when query friendship',
      'friendship',
      'select',
      'fetchFriendList',
    );
  }
};

module.exports = {
  checkPendingInvitationByReceiver,
  checkUserExist,
  sendFriendRequest,
  checkPendingInvitation,
  getTargetFriendFromDB,
  insertDualFriendship,
  deleteRejectedFriendship,
  fetchFriendList,
  getFriendUserName,
};
