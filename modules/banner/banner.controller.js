const err = new Error();
const path = require("path");
const db = require(path.resolve('./models/index'));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const serializer = require(path.resolve('./modules/banner/banner.serializer'));
const Banner = db.Banner;

// LISTS ALL BANNERS
const index = async function(req, res){
    try{
        const showBanner = await Banner.findAll();
        const responseData = await serializer.index(showBanner);

        return res.status(200).send({
            statusCode: 200,
            banners: responseData
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// UPLOAD BANNER METHOD
const upload = async function(req, res){
    try{
      for (let i = 0; i < req.body.length; i++) {
        await Banner.uploadBanner(req.body[i], req);
      }

        return res.status(200).send({
            statusCode: 200,
            message: 'Banner uploaded successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// DELETE BANNER METHOD
const destroy = async function(req, res){
    try{
        const bannerId = req.params.bannerId;
        const banner = await Banner.findByPk(bannerId);
        await banner.destroy();

        return res.status(200).send({
            statusCode: 200,
            message: 'Banner deleted successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// UPDATE BANNER METHOD
const patch = async function(req, res){
    try {
        const bannerId = req.params.bannerId;
        const banner = await Banner.findByPk(bannerId);
        const patchBanner = await banner.patchBanner(req);
        if (!patchBanner) {
            err.statusCode = 422;
            err.message = 'Unable to update banner';
            throw err;
          }

          return res.status(200).send({
            statusCode: 200,
            message: 'Banner updated successfully!'
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


