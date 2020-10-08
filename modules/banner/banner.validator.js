const path = require('path');
const db = require(path.resolve('./models/index'));
const Banner = db.Banner;
const typeEnum = ['Mobile', 'Web'];
const { body, param, validationResult } = require('express-validator');

// GET DESTROY RULES
const destroy = [
    param('bannerId')
      .exists().withMessage('bannerId does not exists!')
      .trim()
      .custom((value) => {
        return Banner.findByPk(value).then((banner) => {
          if (!banner) {
            return Promise.reject(new Error('Banner not found!'));
          }
          return true;
        });
      })
  ];

// GET PATCH RULES
const patch = [
    param('bannerId')
      .exists().withMessage('bannerId does not exists!')
      .trim()
      .custom((value) => {
        return Banner.findByPk(value).then((banner) => {
          if (!banner) {
            return Promise.reject(new Error('Banner not found!'));
          }
          return true;
        });
      }),

    body('link')
    .notEmpty().withMessage('link cannot be empty!')
    .isString().withMessage('link must be string!')
    .trim(),

    body('type')
    .notEmpty().withMessage('type cannot be empty!')
    .isString().withMessage('type must be string!')
    .isIn(typeEnum).withMessage('Invalid type value!')
    .trim()
  ];

// GET UPLOAD RULES
const upload = [
    body('')
    .custom((value) => {
      if(!Array.isArray(value) || !value.length){
        return Promise.reject(new Error('Invalid value'));
      }
      return true;
    }),

    body('*.link')
    .notEmpty().withMessage('link cannot be empty!')
    .isString().withMessage('link must be string!')
    .trim(),

    body('*.type')
    .notEmpty().withMessage('type cannot be empty!')
    .isIn(typeEnum).withMessage('Invalid type value!')
    .isString().withMessage('type must be string!')
    .trim(),
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
    destroy,
    patch,
    upload
  };