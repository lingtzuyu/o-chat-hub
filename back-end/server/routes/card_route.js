const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const { fetchCardCategory } = require('../controllers/card_controller');

router.route('/card/category').post(wrapAsync(fetchCardCategory));

module.exports = router;
