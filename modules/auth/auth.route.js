const path = require('path');
const AuthController = require(path.resolve('./modules/auth/auth.controller'));
const { verifyRules, registerRules, signInRules } = require(path.resolve('./modules/auth/auth.validator'));

module.exports = function(router) {

};