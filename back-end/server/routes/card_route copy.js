const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  fetchCardCategory,
  saveMessagesToNote,
  fetchCardHistory,
  deleteCardById,
  setLikeById,
  setDislikeById,
  checkCardExist,
} = require('../controllers/card_controller');

// 新增至最愛 .
router
  .route('/card/like')
  .post(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(setLikeById)
  );
// 從最愛移除
router
  .route('/card/dislike')
  .post(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(setDislikeById)
  );

// 刪除卡片資料
router
  .route('/card/remove')
  .post(wrapAsync(verifiedAuth), wrapAsync(deleteCardById));

// 取得category資料
router.route('/card/category').get(wrapAsync(fetchCardCategory));

// 新增卡片
router
  .route('/card/notes')
  .post(wrapAsync(verifiedAuth), wrapAsync(saveMessagesToNote));

// 取得歷史紀錄
router
  .route('/card/history')
  .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardHistory));

module.exports = router;
