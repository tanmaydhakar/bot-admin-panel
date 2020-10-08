const path = require('path');
const authPolicy = require(path.resolve('./modules/auth/auth.policy'));
const rules = require(path.resolve('./modules/banner/banner.validator'));
const bannerController = require(path.resolve('./modules/banner/banner.controller'));
const bannerPolicy = require(path.resolve('./modules/banner/banner.policy'));

module.exports = function (router) {
  //API TO LIST ALL BANNERS
  router.get('/api/banners', authPolicy.verifyToken, bannerPolicy.isAllowed, bannerController.index);

  //API TO UPLOAD BANNERS
  router.post('/api/banners', authPolicy.verifyToken, bannerPolicy.isAllowed, rules.upload, rules.verifyRules, bannerController.upload);

  //API TO UPDATE A BANNER
  router.patch('/api/banner/:bannerId', authPolicy.verifyToken, bannerPolicy.isAllowed, rules.patch, rules.verifyRules, bannerController.patch);

  //API TO DELETE A BANNER
  router.delete('/api/banner/:bannerId', authPolicy.verifyToken, bannerPolicy.isAllowed, rules.destroy, rules.verifyRules, bannerController.destroy);
};