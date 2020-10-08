const path = require('path');
const authPolicy = require(path.resolve('./modules/auth/auth.policy'));
const rules = require(path.resolve('./modules/game/game.validator'));
const gameController = require(path.resolve('./modules/game/game.controller'));
const gamePolicy = require(path.resolve('./modules/game/game.policy'));

module.exports = function (router) {
  //API TO LIST ALL GAMES IMAGES
  router.get('/api/games', authPolicy.verifyToken, gamePolicy.isAllowed, gameController.index);

  //API TO UPLOAD GAME IMAGES
  router.post('/api/games', authPolicy.verifyToken, gamePolicy.isAllowed, rules.upload, rules.verifyRules, gameController.upload);

  //API TO UPDATE A GAME IMAGE
  router.patch('/api/game/:gameImageId', authPolicy.verifyToken, gamePolicy.isAllowed, rules.patch, rules.verifyRules, gameController.patch);

  //API TO DELETE A GAME IMAGE
  router.delete('/api/game/:gameImageId', authPolicy.verifyToken, gamePolicy.isAllowed, rules.destroy, rules.verifyRules, gameController.destroy);
};