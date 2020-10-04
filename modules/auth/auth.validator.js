const { body, validationResult } = require('express-validator');

// SIGN-IN VALIDATION RULES
const signInRules = [
  
];
    

// SIGN-IN VALIDATION RULES
const registerRules = [
  
];


const verifyRules = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      next();
    }
}

module.exports = {
    verifyRules,
    registerRules,
    signInRules
}