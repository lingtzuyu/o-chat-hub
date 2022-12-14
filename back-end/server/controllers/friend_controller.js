require('dotenv').config();
const Joi = require('joi');
const Friend = require('../models/friend_model');
const FriendService = require('../services/friend_service');
const FriendEmitEvent = require('../../socketConnectDealer/updateChatStatus');

// invitation req data format
const invitationSchema = Joi.object({
  mail: Joi.string().email().required(),
  token: Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/,
  ),
});

// accept & reject req data format
const friendConfirmSchema = Joi.object({
  userId: Joi.number().required(),

  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
});

// send friend request
const sentFriendInvitation = async (req, res) => {
  const senderId = req.user.userId;
  const receiverMail = req.body.mail;

  // logic for blocking invitation
  const receiverId = await FriendService.checkUserExistService(receiverMail);

  FriendService.checkTargetIsNotMyself(senderId, receiverId);

  await FriendService.checkAlreadyFriends(senderId, receiverId);
  await FriendService.checkInvitationIsPending(senderId, receiverId);

  // add to friend invitation table
  const result = await Friend.sendFriendRequest(senderId, receiverId);

  // emit to socket event
  FriendEmitEvent.updateInvitations(receiverId);

  return res.status(200).json({
    status: 'Friend Request sent ok',
    friendRequestId: result.insertId,
  });
};

// Accept and become friend
const accpetFriendInvitation = async (req, res) => {
  // accept who as friend
  const acceptId = req.body.userId;
  // who accept the above user
  const acceptorId = req.user.userId;

  // to prevent directly post api to add
  await FriendService.checkAcceptFriend(acceptorId, acceptId);

  // insert into friendship table, delete invitation in friendinvitation table
  await Friend.insertDualFriendship(acceptId, acceptorId);

  // socket event

  // update invitation to client
  await FriendEmitEvent.updateInvitations(acceptorId);

  // update FriendList (both side)
  await FriendEmitEvent.updateFriendList(acceptorId);
  await FriendEmitEvent.updateFriendList(acceptId);

  return res.status(200).json({ msg: 'Accept invitation success' });
};

// 拒絕好友邀請
const rejectFriendInvitation = async (req, res) => {
  try {
    const rejectId = req.body.userId;
    console.log('reject', rejectId);
    // TODO: 直接在body內 (JWT解出來的地方)，改為id也帶進去，就不用再query sql找一次id
    const rejectorMail = req.user.mail;
    const queryRejectorIdByMail = await Friend.checkUserExist(rejectorMail);
    console.log('queryRejectorIdByMail', queryRejectorIdByMail);
    const rejectorId = queryRejectorIdByMail;
    console.log('拒絕這個人的好友', rejectId);
    console.log('這是拒絕別人好友的人', rejectorId);
    // update socket event friendInvitation
    // TODO: 這邊之後也需要做更改... 統一用id
    await FriendEmitEvent.updateInvitations(rejectorId);
    const result = await Friend.deleteRejectedFriendship(rejectId, rejectorId);
    res.status(200).json({ result: 'Reject invitation success' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Error, please try again');
  }
};

// user Profile
const getUserProfile = async (req, res) => {
  const { mail } = req.user;
  const response = await Friend.checkUserProfile(mail);
  // console.log('controller', response);
  res.status(200).json({ result: response });
};

// friend username
const getFriendUserName = async (req, res) => {
  const { userId, friendId } = req.query;

  const [response] = await Friend.getFriendUserName(userId, friendId);
  console.log(response);
  if (response === undefined || null) {
    return res
      .status(400)
      .send('frined id or user id wrong, maybe you are not friends');
  }
  return res.status(200).json({ target: response });
};

module.exports = {
  invitationSchema,
  friendConfirmSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
  rejectFriendInvitation,
  getUserProfile,
  getFriendUserName,
};
