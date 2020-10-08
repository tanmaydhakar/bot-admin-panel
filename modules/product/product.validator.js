const path = require('path');
const db = require(path.resolve('./models/index'));
const Product = db.Product;
const typeEnum = ['Mobile', 'Web'];
const { body, param, validationResult } = require('express-validator');

//GET SHOW RULES
const show = [
    param('productId')
      .exists().withMessage('productId does not exists!')
      .trim()
      .custom((value) => {
        return Product.findByPk(value).then((product) => {
          if (!product) {
            return Promise.reject(new Error('Product not found!'));
          }
          return true;
        });
      })
];

//GET PATCH RULES
const patch = [
    param('productId')
      .exists().withMessage('productId does not exists!')
      .trim()
      .custom((value) => {
        return Product.findByPk(value).then((product) => {
          if (!product) {
            return Promise.reject(new Error('Product not found!'));
          }
          return true;
        });
      }),

    body('title')
    .exists().withMessage('title does not exists!')
    .notEmpty().withMessage('title cannot be empty!')
    .isString().withMessage('title must be string!')
    .trim(),

    body('description')
    .exists().withMessage('description does not exists!')
    .notEmpty().withMessage('description cannot be empty!')
    .isString().withMessage('description must be string!')
    .trim(),

    body('youtubeLink')
    .notEmpty().withMessage('youtubeLink cannot be empty!')
    .isString().withMessage('youtubeLink must be string!')
    .trim(),

    body('thumbnailLink')
    .notEmpty().withMessage('thumbnailLink cannot be empty!')
    .isString().withMessage('thumbnailLink must be string!')
    .trim(),

    body('productImages')
    .isArray({
        min:1
    })
    .notEmpty().withMessage('productImages cannot be empty!')
];

//GET UPLOAD RULES
const upload = [
    body('title')
    .exists().withMessage('title does not exists!')
    .notEmpty().withMessage('title cannot be empty!')
    .isString().withMessage('title must be string!')
    .trim(),

    body('description')
    .exists().withMessage('description does not exists!')
    .notEmpty().withMessage('description cannot be empty!')
    .isString().withMessage('description must be string!')
    .trim(),

    body('youtubeLink')
    .notEmpty().withMessage('youtubeLink cannot be empty!')
    .isString().withMessage('youtubeLink must be string!')
    .trim(),

    body('thumbnailLink')
    .notEmpty().withMessage('thumbnailLink cannot be empty!')
    .isString().withMessage('thumbnailLink must be string!')
    .trim(),

    body('productImages')
    .isArray({
        min:1
    })
    .notEmpty().withMessage('productImages cannot be empty!')
];

//GET DESTROY RULES
const destroy = [
    param('productId')
      .exists().withMessage('productId does not exists!')
      .trim()
      .custom((value) => {
        return Product.findByPk(value).then((product) => {
          if (!product) {
            return Promise.reject(new Error('Product not found!'));
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
    destroy,
    show,
    patch,
    upload
  };