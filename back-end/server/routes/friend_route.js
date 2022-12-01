const router = require('express').Router();
// 用來validate payload
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');

// TODO: 用來verify Token .
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  invitationSchema,
  friendConfirmSchema,
  friendRejectSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
  rejectFriendInvitation,
  getUserProfile,
} = require('../controllers/friend_controller');

router
  .route('/friend/invitation')
  // 前端打過來的資料再驗證一次
  .post(
    wrapAsync(verifiedAuth),
    validator.body(invitationSchema),
    wrapAsync(sentFriendInvitation)
  );

// 接受好友邀請&寫入資料庫
router
  .route('/friend/accept')
  // 前端打過來的資料再驗證一次
  .post(
    // 一樣從local storage拿，是誰發出的好友邀請要從這邊解，以防有人拿token去亂加好友
    wrapAsync(verifiedAuth),
    validator.body(friendConfirmSchema),
    wrapAsync(accpetFriendInvitation)
  );

// 拒絕好友邀請&從資料庫刪除
router
  .route('/friend/reject')
  // 前端打過來的資料再驗證一次
  .post(
    // 一樣從local storage拿，是誰發出的好友邀請要從這邊解，以防有人拿token去亂加好友
    wrapAsync(verifiedAuth),
    validator.body(friendRejectSchema),
    wrapAsync(rejectFriendInvitation)
  );

// user profile
router
  .route('/friend/userprofile')
  .get(wrapAsync(verifiedAuth), wrapAsync(getUserProfile));

module.exports = router;
