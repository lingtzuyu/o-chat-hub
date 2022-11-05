const router = require('express').Router();
const { wrapAsync } = require('../../util/util');
const { register, login } = require('../controllers/auth_controller');

router.route('/register').post(wrapAsync(register));
router.route('/login').post(wrapAsync(login));

module.exports = router;
