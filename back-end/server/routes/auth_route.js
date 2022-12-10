const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const { wrapAsync } = require('../../util/util');
const {
  register,
  login,
  registerSchema,
  loginSchema,
  verifiedAuth,
  updateNewUsername,
} = require('../controllers/auth_controller');

// register route
router
  .route('/register')
  .post(validator.body(registerSchema), wrapAsync(register));

// login route
router.route('/login').post(validator.body(loginSchema), wrapAsync(login));

// update userName
router.route('/auth/username').post(verifiedAuth, wrapAsync(updateNewUsername));

module.exports = router;
