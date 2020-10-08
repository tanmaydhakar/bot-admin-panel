// METHOD TO PREPARE DATA FOR LISTING BANNERS
const index = async function(banners){
    const finalArray = [];
    for (let i = 0; i < banners.length; i++) {
        const tempSchema = {
            id:banners[i].id,
            link:banners[i].link,
            type:banners[i].type
        };
        finalArray.push(tempSchema);
      }
      return finalArray;
};

module.exports = {
    index,
  };