// METHOD TO PREPARE DATA FOR INDEXING PRODUCT
const index = async function(product){
    const finalArray = [];
    for (let i = 0; i < product.length; i++) {
        const tempSchema = {
            id:product[i].id,
            title:product[i].title,
            description:product[i].description,
            youtubeLink:product[i].youtube_link,
            thumbnailLink:product[i].thumbnail_link,
            productImages:product[i].product_images
        };
        finalArray.push(tempSchema);
      }
      return finalArray;
};

// METHOD TO PREPARE DATA FOR LISTING PRODUCT
const show = async function(product){
    const finalData = {}

    finalData.title = product.title;
    finalData.description = product.description;
    finalData.youtubeLink = product.youtube_link;
    finalData.thumbnailLink = product.thumbnail_link;
    finalData.productImages = product.product_images;
    return finalData;
};

module.exports = {
    show,
    index
  };