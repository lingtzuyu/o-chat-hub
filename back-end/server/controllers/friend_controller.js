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

// id from accept (or reject) => {id: 47}
const friendConfirmSchema = Joi.object({
  // TODO: 這個用number或是string都會過..靠邀
  acceptId: Joi.number().required(),
  // https://github.com/hapijs/joi/issues/992
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
});

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
  FriendEmitEvent.updateInvitations(receiverMail, receiverId);

  return res.status(200).json({
    status: 'Friend Request sent ok',
    friendRequestId: result.insertId,
  });
};

// TODO: accept以及reject可以合併，需要改body內的key，統一為id (instead of acceptId & rejectId)
const friendRejectSchema = Joi.object({
  // TODO: 這個用number或是string都會過..靠邀
  rejectId: Joi.number().required(),
  // https://github.com/hapijs/joi/issues/992
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
});

// 送出好友邀請

// 接受好友邀請
const accpetFriendInvitation = async (req, res) => {
  const { acceptId } = req.body;
  // TODO: 直接在body內 (JWT解出來的地方)，改為id也帶進去，就不用再query sql找一次id
  const acceptorMail = req.user.mail;
  // 操作的人 (user) = acceptor
  const queryAccptorIdByMail = await Friend.checkUserExist(acceptorMail);
  // 發發送好友邀請的人 = accept
  const queryAcceptInfoById = await Friend.checkUserInfoById(acceptId);
  console.log('accept用ID反查', queryAcceptInfoById);
  const acceptMail = queryAcceptInfoById.userInfo.mail;
  const acceptorId = queryAccptorIdByMail;
  const acceptTime = new Date();
  console.log('接受這個人的好友', acceptId);
  console.log('這是接受別人好友的人', acceptorId);
  // 插入資料
  try {
    // 不能讓別人直接用打API亂加
    const checkFriendInvitationiTable = await Friend.checkPendingInvitation(
      acceptId,
      acceptorId,
    );
    // 如果資料庫內有該筆資料，才讓他執行插入好友資料表
    if (!checkFriendInvitationiTable) {
      return res
        .status(400)
        .send('Please send invitation first before adding friend');
    }

    // TODO: 現在是把friendinvitation表內的status從0改到1，但是好像直接刪除會比較好 (考慮到後面如果被刪除要重新加的話)
    const result = await Friend.insertDaulFriendship(
      acceptId,
      acceptorId,
      acceptTime,
    );

    // update socket event friendInvitation (讓渲染pending List的消失)
    await FriendEmitEvent.updateInvitations(acceptorMail, acceptId);

    // 在friend list處新增好友 (按下accept後雙方新增)
    // 用updateFriendList在觸發一次render
    await FriendEmitEvent.updateFriendList(acceptorMail);
    await FriendEmitEvent.updateFriendList(acceptMail);

    return res.status(200).json({ result: 'Accept invitation success' });
  } catch (err) {
    console.log('accept error', err);
    return res.status(500).send('Internal Error, please try again');
  }
};

// 拒絕好友邀請
const rejectFriendInvitation = async (req, res) => {
  try {
    const { rejectId } = req.body;
    // TODO: 直接在body內 (JWT解出來的地方)，改為id也帶進去，就不用再query sql找一次id
    const rejectorMail = req.user.mail;
    const queryRejectorIdByMail = await Friend.checkUserExist(rejectorMail);
    const rejectorId = queryRejectorIdByMail;
    console.log('拒絕這個人的好友', rejectId);
    console.log('這是拒絕別人好友的人', rejectorId);
    // update socket event friendInvitation
    // TODO: 這邊之後也需要做更改... 統一用id
    await FriendEmitEvent.updateInvitations(rejectorMail, rejectId);
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
  friendRejectSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
  rejectFriendInvitation,
  getUserProfile,
  getFriendUserName,
};
