const err = new Error();
const path = require("path");
const db = require(path.resolve('./models/index'));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const serializer = require(path.resolve('./modules/game/game.serializer'));
const Game = db.Game;

// LISTS ALL GAME IMAGES
const index = async function(req, res){
    try{
        const showGame = await Game.findAll();
        const responseData = await serializer.index(showGame);

        return res.status(200).send({
            statusCode: 200,
            banners: responseData
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// UPLOAD GAME IMAGE METHOD
const upload = async function(req, res){
    try{
      for (let i = 0; i < req.body.length; i++) {
        await Game.uploadGameImage(req.body[i], req);
      }

        return res.status(200).send({
            statusCode: 200,
            message: 'Game image uploaded successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// DELETE GAME IMAGE METHOD
const destroy = async function(req, res){
    try{
        const gameImageId = req.params.gameImageId;
        const gameImage = await Game.findByPk(gameImageId);
        await gameImage.destroy();

        return res.status(200).send({
            statusCode: 200,
            message: 'Game image deleted successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// UPDATE GAME IMAGE METHOD
const patch = async function(req, res){
    try {
        const gameImageId = req.params.gameImageId;
        const gameImage = await Game.findByPk(gameImageId);
        const patchGameImage = await gameImage.patchGameImage(req);
        if (!patchGameImage) {
            err.statusCode = 422;
            err.message = 'Unable to update game image';
            throw err;
          }

          return res.status(200).send({
            statusCode: 200,
            message: 'Game image updated successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

module.exports = {
    index,
    upload,
    destroy,
    patch
  };