const jimp = require("jimp");
const products = require("../products/products.json");

async function compareImages(stockImage) {
  const image = await jimp.read(stockImage);

  const relatedProducts = [];

  for (let i = 0; i < products.length; i++) {
    const tempImage = await jimp.read(products[i].photo);

    const imageDiff = jimp.diff(image, tempImage);
    const imageHash = image.hash();
    const tempImageHash = tempImage.hash();
    const imageDistance = jimp.distance(image, tempImage);

    if (
      imageHash === tempImageHash ||
      imageDiff <= 0.16 ||
      imageDistance <= 0.16
    ) {
      relatedProducts.push(products[i]);

      if (relatedProducts.length > 8) {
        return relatedProducts;
      }
    }
  }

  return relatedProducts;
}

// export default compareImages;
module.exports = compareImages;
