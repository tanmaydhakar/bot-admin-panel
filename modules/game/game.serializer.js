// METHOD TO PREPARE DATA FOR LISTING GAME IMAGES
const index = async function(gamesImages){
    const finalArray = [];
    for (let i = 0; i < gamesImages.length; i++) {
        const tempSchema = {
            id:gamesImages[i].id,
            link:gamesImages[i].link,
            type:gamesImages[i].type
        };
        finalArray.push(tempSchema);
      }
      return finalArray;
};

module.exports = {
    index,
  };