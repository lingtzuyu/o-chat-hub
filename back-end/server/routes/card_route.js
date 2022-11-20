const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  fetchCardCategory,
  saveMessagesToNote,
  fetchCardHistory,
} = require('../controllers/card_controller');

// 取得category資料
router.route('/card/category').get(wrapAsync(fetchCardCategory));

// 新增卡片
router
  .route('/card/notes')
  .post(wrapAsync(verifiedAuth), wrapAsync(saveMessagesToNote));

// 取得歷史紀錄
router.route('/card/history').get(wrapAsync(fetchCardHistory));

module.exports = router;
