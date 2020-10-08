const path = require('path');
const rules = require(path.resolve('./modules/auth/auth.validator'));
const authController = require(path.resolve('./modules/auth/auth.controller'));

module.exports = function (router) {
  // API TO REGISTER USER 
  router.post('/api/auth/register', rules.registerRules, rules.verifyRules, authController.register);

  // API TO SIGN-IN USER 
  router.post('/api/auth/signIn', rules.signInRules, rules.verifyRules, authController.signIn);

  // API TO SEND RESET PASSWORD INSTRUCTIONS EMAIL
  router.post('/api/auth/forgotPassword', authController.forgotPassword);

  // API TO RESET USERS PASSWORD
  router.post('/api/auth/resetPassword/:token', rules.resetPasswordRules, rules.verifyRules, authController.resetPassword);
};