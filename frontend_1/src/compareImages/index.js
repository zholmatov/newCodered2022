const jimp = require("jimp");
const products = require("../products/products.json");

// const outOfStock1 =
//   "/Users/zholmatov/Desktop/test/mern-ecommerce/client/src/compareImages/outOfStock.png";
// // "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/d9742890-5089-4814-b4f1-56e607c2c209_17c5a95e-2913-41d4-a305-f6310a2e4d27_200x200.png?v=1652384210";

// const inStock1 =
//   "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/a1fcfd05-8703-4b01-8049-5eb74856c325_62c74bfc-a4cd-4e0b-a570-d507f15865a4_200x200.png?v=1649521641";

// const eta1 =
//   "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/9bda7776-150e-42a0-98b6-84bf90a2784f_b9a3a2df-fd26-47e6-abe0-bc0a0b095711_200x200.png?v=1649873899";

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

module.exports = compareImages;
