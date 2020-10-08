const path = require('path');
const db = require(path.resolve('./models/index'));
const User = db.User;
const { body, param, validationResult } = require('express-validator');

// SIGN-IN VALIDATION RULES
const signInRules = [
  body('email')
    .exists().withMessage('Email does not exists!')
    .isEmail().withMessage('Invalid email format!')
    .normalizeEmail()
    .custom((value) => {
      const field = {
        email: value
      };
      return User.findBySpecificField(field).then((user) => {
        if (!user) {
          return Promise.reject(new Error('Email Does not exists!'));
        }
        return true;
      });
    }),

  body('password')
    .exists().withMessage('password does not exists!')
    .notEmpty().withMessage('password cannot be empty!')
    .isLength({
      min: 6
    })
];

// SIGN-IN VALIDATION RULES
const registerRules = [
  body('email')
    .exists().withMessage('Email does not exists!')
    .isEmail().withMessage('Invalid email format!')
    .normalizeEmail()
    .custom((value) => {
      const field = {
        email: value
      };
      return User.findBySpecificField(field).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already exists!'));
        }
        return true;
      });
    }),

  body('phone')
    .exists().withMessage('Phone does not exists!')
    .isString({
      min: 10,
      max: 12
    }).withMessage('Phone should be in string!')
    .custom((value) => {
      const field = {
        phone: value
      };
      return User.findBySpecificField(field).then((user) => {
        if (user) {
          return Promise.reject(new Error('Phone already exists!'));
        }
        return true;
      });
    }),

  body('firstName')
    .exists().withMessage('firstName does not exists!')
    .notEmpty().withMessage('firstName cannot be empty!')
    .trim(),

  body('lastName')
    .exists().withMessage('lastName does not exists!')
    .notEmpty().withMessage('lastName cannot be empty!')
    .trim(),

  body('password')
    .exists().withMessage('password does not exists!')
    .notEmpty().withMessage('password cannot be empty!')
    .isLength({
      min: 6
    })
];

// RESET PASSWORD VALIDATION RULES
const resetPasswordRules = [
  param('token')
    .exists().withMessage('Token does not exists!')
    .trim()
    .custom((value) => {
      const field = {
        reset_password_token: value
      };
      return User.findBySpecificField(field).then((user) => {
        if (!user) {
          return Promise.reject(new Error('Invalid token!'));
        }
        return true;
      });
    })
];

// FORGET PASSWORD VALIDATION RULES
const forgetPasswordRules = [
  body('email')
    .exists().withMessage('Email does not exists!')
    .isEmail().withMessage('Invalid email format!')
    .normalizeEmail()
    .custom((value) => {
      const field = {
        email: value
      };
      return User.findBySpecificField(field).then((user) => {
        if (!user) {
          return Promise.reject(new Error('Email already exists!'));
        }
        return true;
      });
    })
];

const verifyRules = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array().shift();
    return res.status(422).jsonp({
      statusCode: 422,
      message: error
    });
  } else {
    return next();
  }
};

module.exports = {
  verifyRules,
  signInRules,
  registerRules,
  resetPasswordRules,
  forgetPasswordRules
};
