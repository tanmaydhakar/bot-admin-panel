// METHOD TO PREPARE DATA FOR LISTING PRODUCT
const show = async function(product){
    const finalData = {}

    finalData.title = product.title;
    finalData.description = product.description;
    finalData.youtube_link = product.youtube_link;
    finalData.thumbnail_link = product.thumbnail_link;
    finalData.product_images = product.product_images;
    return finalData;
};

module.exports = {
    show,
  };