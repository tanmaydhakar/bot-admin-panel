const path = require('path');
const authPolicy = require(path.resolve('./modules/auth/auth.policy'));
const rules = require(path.resolve('./modules/product/product.validator'));
const productController = require(path.resolve('./modules/product/product.controller'));
const productPolicy = require(path.resolve('./modules/product/product.policy'));

module.exports = function (router) {
  //API TO UPLOAD A PRODUCT
  router.post('/api/product', authPolicy.verifyToken, productPolicy.isAllowed, rules.upload, rules.verifyRules, productController.insert);

  //API TO SHOW A PRODUCT
  router.get('/api/product/:productId', authPolicy.verifyToken, productPolicy.isAllowed, rules.show, rules.verifyRules, productController.show);

  //API TO UPDATE A PRODUCT
  router.patch('/api/product/:productId', authPolicy.verifyToken, productPolicy.isAllowed, rules.patch, rules.verifyRules, productController.patch);

  //API TO DELETE A PRODUCT
  router.delete('/api/product/:productId', authPolicy.verifyToken, productPolicy.isAllowed, rules.destroy, rules.verifyRules, productController.destroy);
};