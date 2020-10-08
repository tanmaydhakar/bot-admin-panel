const err = new Error();
const path = require("path");
const db = require(path.resolve('./models/index'));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const serializer = require(path.resolve('./modules/product/product.serializer'));
const Product = db.Product;


// SHOW PRODUCT METHOD
const index = async function(req, res){
  try{
      const showProducts = await Product.findAll();
      const responseData = await serializer.index(showProducts);

      return res.status(200).send({
          statusCode: 200,
          product: responseData
        });
  } catch (error) {
  const errorResponse = errorHandler.getErrorMsg(error);
  return res.status(errorResponse.statusCode).send(errorResponse);
}
};

// SHOW PRODUCT METHOD
const show = async function(req, res){
    try{
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        const responseData = await serializer.show(product);

        return res.status(200).send({
            statusCode: 200,
            product: responseData
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

//UPLOAD PRODUCT METHOD
const insert = async function(req, res){
    try{
        const insertProduct = await Product.insertProduct(req);
        if (!insertProduct) {
            err.statusCode = 422;
            err.message = 'Unable to insert product';
            throw err;
          }

        return res.status(200).send({
            statusCode: 200,
            message: 'Product inserted successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

//DELETE PRODUCT METHOD
const destroy = async function(req, res){
    try{
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        await product.destroy();

        return res.status(200).send({
            statusCode: 200,
            message: 'Product deleted successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// UPDATE PRODUCT METHOD
const patch = async function(req, res){
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        const patchProduct = await product.patchProduct(req);
        if (!patchProduct) {
            err.statusCode = 422;
            err.message = 'Unable to update product';
            throw err;
          }

          return res.status(200).send({
            statusCode: 200,
            message: 'Product updated successfully!'
          });
    } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

module.exports = {
    index,
    show,
    insert,
    destroy,
    patch
  };