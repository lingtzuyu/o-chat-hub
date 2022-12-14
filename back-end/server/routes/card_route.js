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

// card notes related
router
  .route('/card/notes')
  // post: save messages to notes
  .post(wrapAsync(verifiedAuth), wrapAsync(saveMessagesToNote))
  // get: fetch all notes history
  .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardHistory))
  // delete: delete single card
  .delete(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(deleteCardById),
  )
  // change card title and content
  .patch(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(updateCardTitleAndNotes),
  );

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

// get current available category name from sql
router
  .route('/card/category')
  .get(wrapAsync(fetchCardCategory))
  .patch(
    wrapAsync(verifiedAuth),
    wrapAsync(checkCardExist),
    wrapAsync(updateCategory),
  );

// fetch card history by category or current user
router
  .route('/card/details/:category')
  .get(wrapAsync(verifiedAuth), wrapAsync(fetchCardDetailsByCategory));

module.exports = router;
