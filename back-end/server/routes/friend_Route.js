const router = require('express').Router();
// 用來validate payload
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');

// TODO: 用來verify Token
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  invitationSchema,
  friendConfirmSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
} = require('../controllers/friend_controller');

router
  .route('/friend/invitation')
  // 前端打過來的資料再驗證一次
  .post(
    wrapAsync(verifiedAuth),
    validator.body(invitationSchema),
    wrapAsync(sentFriendInvitation)
  );

// 接受好友邀請病寫入資料庫
router
  .route('/friend/accept')
  // 前端打過來的資料再驗證一次
  .post(
    // 一樣從local storage拿，是誰發出的好友邀請要從這邊解，以防有人拿token去亂加好友
    wrapAsync(verifiedAuth),
    validator.body(friendConfirmSchema),
    wrapAsync(accpetFriendInvitation)
  );

module.exports = router;
