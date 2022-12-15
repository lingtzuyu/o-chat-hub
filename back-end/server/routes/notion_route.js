require('dotenv').config();
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
} = require('../controllers/notion_controller');

// create notion connection
router
  .route('/notion/token')
  .post(
    wrapAsync(verifiedAuth),
    wrapAsync(checkNotionToken),
    wrapAsync(getNotionToken),
  );

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
