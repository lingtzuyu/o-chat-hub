const router = require('express').Router();
// 用來validate payload
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');

const { verifiedAuth } = require('../controllers/auth_controller');
const {
  invitationSchema,
  friendConfirmSchema,
  sentFriendInvitation,
  accpetFriendInvitation,
  rejectFriendInvitation,
  getUserProfile,
  getFriendUserName,
} = require('../controllers/friend_controller');

router
  .route('/friend/invitation')
  // 前端打過來的資料再驗證一次
  .post(
    wrapAsync(verifiedAuth),
    validator.body(invitationSchema),
    wrapAsync(sentFriendInvitation),
  );

// accept or reject friend
router
  .route('/friend/accept')
  .post(
    wrapAsync(verifiedAuth),
    validator.body(friendConfirmSchema),
    wrapAsync(accpetFriendInvitation),
  );

router
  .route('/friend/reject')
  .post(
    wrapAsync(verifiedAuth),
    validator.body(friendConfirmSchema),
    wrapAsync(rejectFriendInvitation),
  );

// get friend username to set chosen chat details
router
  .route('/friend/username')
  .get(wrapAsync(verifiedAuth), wrapAsync(getFriendUserName));

module.exports = router;
