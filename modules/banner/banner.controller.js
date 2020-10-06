const err = new Error();
const path = require("path");
const db = require(path.resolve('./models/index'));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const serializer = require(path.resolve('./modules/banner/banner.serializer'));
const Banner = db.Banner;

const show = async function(req, res){
    try{
        const showBanner = await Banner.showBanner(req);
        const responseData = await serializer.show(showBanner);

        return res.status(200).send({
            statusCode: 200,
            banner: responseData
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

const upload = async function(req, res){
    try{
        const bannerId = req.params.bannerId;
        const banner = await Banner.findByPk(bannerId);
        const uploadBanner = await banner.uploadBanner(req);
        if (!uploadBanner) {
            err.statusCode = 422;
            err.message = 'Unable to upload banner';
            throw err;
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

const patch = async function(req, res){
    try {
        const destroyBanner = await Banner.patchBanner(req);
        if (!destroyBanner) {
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
    show,
    upload,
    destroy,
    patch
  };


