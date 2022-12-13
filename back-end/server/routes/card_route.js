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
  fetchCardDetailsByCategory,
  updateCardTitleAndNotes,
  updateCategory,
} = require('../controllers/card_controller');
const { fetchCardHistoryByCategory } = require('../models/card_model');

// post: save messages to notes
// get: fetch notes history
// delete: delete card
router
  .route('/card/notes')
  .post(wrapAsync(verifiedAuth), wrapAsync(saveMessagesToNote))
  .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardHistory))
  .delete(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(deleteCardById),
  );

// FIXME: 已經併到上方GET，可以廢棄取得user過去的卡片歷史紀錄
// router
//   .route('/card/history')
//   .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardHistory));

// add to read
router
  .route('/card/like')
  .patch(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(setLikeById),
  );
// remove from read (unread)
router
  .route('/card/dislike')
  .patch(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(setDislikeById),
  );

// 刪除卡片資料 //TODO: 前後端改delte
router
  .route('/card/remove')
  .post(wrapAsync(verifiedAuth), wrapAsync(deleteCardById));

// 取得category資料
router.route('/card/category').get(wrapAsync(fetchCardCategory));

// 取得歷史紀錄by category
router
  .route('/card/details/:category')
  .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardDetailsByCategory));

// 更新卡片Title以及notes //TODO: patch 前後端
router
  .route('/card/modification')
  .post(
    verifiedAuth,
    wrapAsync(checkCardExist),
    wrapAsync(updateCardTitleAndNotes),
  );
// 更新卡片category FIXME: 改成category
router
  .route('/card/changecategory')
  .post(verifiedAuth, wrapAsync(checkCardExist), wrapAsync(updateCategory));

module.exports = router;
