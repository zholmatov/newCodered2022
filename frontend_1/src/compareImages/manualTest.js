const testFunction = require("./index");

const outOfStock2 =
  "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/d9742890-5089-4814-b4f1-56e607c2c209_26468bf8-e1c8-4568-879d-55c0baa76709_200x200.png?v=1662404350";

const inStock2 =
  "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/a1fcfd05-8703-4b01-8049-5eb74856c325_265e321b-894b-4aae-a946-da9bcace1232_200x200.png?v=1649873777";
const eta2 =
  "https://cdn.shopify.com/s/files/1/0590/0845/0768/t/4/assets/9bda7776-150e-42a0-98b6-84bf90a2784f_a05fcda5-dcae-4875-86f0-99afb8764a47_200x200.png?v=1649387047";

const productImage =
  "https://cdn.shopify.com/s/files/1/0637/4388/5544/products/IMG_0008_1copy_667c7720-db93-4296-b229-b8aa45ac778e_1200x.jpg?v=1649629993";

const imagePng = "/Users/zholmatov/Downloads/codered/CODERED_2022/client/src/compareImages/image.png";

const test3 = "https://cdn.shopify.com/s/files/1/0637/4388/5544/products/IMG_9870_1200x.jpg?v=1665457178";

async function manualTest() {
  const relatedProducts = await testFunction(imagePng);
  console.log(relatedProducts);
}

manualTest();
