const router = require('express').Router();
// use joi and validator to validate the input
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');
const {
  register,
  login,
  registerSchema,
  loginSchema,
  verifiedAuth,
} = require('../controllers/auth_controller');

// register route
router
  .route('/register')
  .post(validator.body(registerSchema), wrapAsync(register));

// login route
router.route('/login').post(validator.body(loginSchema), wrapAsync(login));

// test router => 經過verifiedAuth這個middleware for 身分驗證後才會往下pass
router.route('/testlogin').get(wrapAsync(verifiedAuth), (req, res) => {
  res.send('verifiedAuth ok');
});

module.exports = router;
