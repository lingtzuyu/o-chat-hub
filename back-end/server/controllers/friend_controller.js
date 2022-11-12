require('dotenv').config();
const Joi = require('joi');
const Friend = require('../models/friend_model');

// mail from friendInvitation
const invitationSchema = Joi.object({
  mail: Joi.string().email().required(),
  // https://github.com/hapijs/joi/issues/992
  token: Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  ),
});

// 送出好友邀請
const sentFriendInvitation = async (req, res) => {
  // 可以從 verifiedAuth(auth_controller)的middleware中拿到是誰發出(sender_user_id)的順便認證
  const senderMail = req.user.mail;
  // 從payload中拿到mail (送出者: frontend: api.sendFriendRequest)
  const receiverMail = req.body.mail;

  const checkRecieverIdExist = await Friend.checkUserExist(receiverMail);
  const checkSenderIdExist = await Friend.checkUserExist(senderMail);
  const receiverId = checkRecieverIdExist[0]?.id;
  const senderId = checkSenderIdExist[0].id;

  try {
    // receiver使用者不存在
    if (receiverId === undefined) {
      console.log('1');
      return res.status(400).send({ error: `User ${receiverMail} not exist` });
    }
    // 不能加自己
    if (receiverId === senderId) {
      console.log('2');
      return res
        .status(400)
        .send({ error: 'You are not allowed to add yourself' });
    }

    // 已經是好友

    const targetfriendCheck = await Friend.getTargetFriendFromDB(
      senderId,
      receiverId
    );

    if (targetfriendCheck[0]) {
      return res.status(400).json({
        error: `The user ${receiverMail} is already your friend`,
      });
    }

    // 已經被加過了，在等待
    const checkPendingInvitation = await Friend.checkPendingInvitation(
      senderId,
      receiverId
    );
    // !=null => 表內有資料，已經邀請過
    if (checkPendingInvitation[0]) {
      const sentTime = checkPendingInvitation[0].sendtime;

      return res.status(400).json({
        error: 'You have already sent the invitation',
        senttime: `${sentTime}`,
      });
    }

    // 加入好友邀請資料表
    const result = await Friend.sendFriendRequest(senderId, receiverId);
    return res.status(200).json({
      status: 'Friend Request sent ok',
      friendRequestId: result.insertId,
    });
  } catch (err) {
    console.log('error msg', err);
    res.status(500).send('Internal Error controller');
  }
};

module.exports = { invitationSchema, sentFriendInvitation };
