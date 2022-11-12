const router = require('express').Router();
// 用來validate payload
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');

// TODO: 用來verify Token
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  sentFriendInvitation,
  invitationSchema,
} = require('../controllers/friend_controller');

router
  .route('/friend/invitation')
  // 前端打過來的資料再驗證一次
  // TODO: (minor) 驗證這個人是否有在這個app內，如果沒有就不給傳，注意JOI也要過
  .post(
    wrapAsync(verifiedAuth),
    validator.body(invitationSchema),
    wrapAsync(sentFriendInvitation)
  );

module.exports = router;
