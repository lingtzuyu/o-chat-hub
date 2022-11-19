const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  fetchCardCategory,
  saveMessagesToNote,
} = require('../controllers/card_controller');

router.route('/card/category').post(wrapAsync(fetchCardCategory));

router
  .route('/card/notes')
  .post(wrapAsync(verifiedAuth), wrapAsync(saveMessagesToNote));

module.exports = router;
