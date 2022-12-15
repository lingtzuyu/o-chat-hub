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
  const sendTime = new Date();

  // logic for blocking invitation
  const receiverId = await FriendService.checkUserExistService(receiverMail);

  FriendService.checkTargetIsNotMyself(senderId, receiverId);

  await FriendService.checkAlreadyFriends(senderId, receiverId);
  await FriendService.checkInvitationIsPending(senderId, receiverId);

  // add to friend invitation table
  const result = await Friend.sendFriendRequest(senderId, receiverId, sendTime);

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
  await FriendService.checkFriendInvitationExist(acceptorId, acceptId);

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

// reject friend invitation
const rejectFriendInvitation = async (req, res) => {
  // reject who to be frien
  const rejectId = req.body.userId;
  // who reject the above
  const rejectorId = req.user.userId;

  // to prevent directly post api to reject
  await FriendService.checkFriendInvitationExist(rejectorId, rejectId);

  // delete friendinvitation data
  await Friend.deleteRejectedFriendship(rejectId, rejectorId);

  // update socket event friendInvitation
  await FriendEmitEvent.updateInvitations(rejectorId);

  res.status(200).json({ msg: 'Reject invitation success' });
};

// get friend username (to set forward target)
const getFriendUserName = async (req, res) => {
  const { userId } = req.user;
  const { friendId } = req.query;

  const result = await FriendService.checkIsValidForwardTarget(
    userId,
    friendId,
  );

  return res.status(200).json({ data: result });
};

module.exports = {
  invitationSchema,
  friendConfirmSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
  rejectFriendInvitation,
  getFriendUserName,
};
