const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

router.route('/trello').post();

module.exports = router;
