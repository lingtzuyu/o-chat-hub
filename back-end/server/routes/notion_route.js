const router = require('express').Router();

const { wrapAsync } = require('../../util/util');
const { verifiedAuth } = require('../controllers/auth_controller');
const {
  getNotionToken,
  exportToNotion,
  checkNotionToken,
  checkNotionTokenWhenExporting,
  removeNotionToken,
  recoverNotionToken,
  clearNotionLink,
} = require('../controllers/notion_controller');
const { clearNotionConnect } = require('../models/notion_model');

// create notion connection
router
  .route('/notion/token')
  .post(
    wrapAsync(verifiedAuth),
    wrapAsync(checkNotionToken),
    wrapAsync(getNotionToken),
  )
  .delete(wrapAsync(verifiedAuth), wrapAsync(clearNotionLink));

// remove notion connection
router
  .route('/notion/removal')
  .post(wrapAsync(verifiedAuth), wrapAsync(removeNotionToken));

// recover notion connection
router
  .route('/notion/recover')
  .post(wrapAsync(verifiedAuth), wrapAsync(recoverNotionToken));

// export to notion notes
router
  .route('/notion/export')
  .post(
    wrapAsync(verifiedAuth),
    wrapAsync(checkNotionTokenWhenExporting),
    wrapAsync(exportToNotion),
  );

module.exports = router;
