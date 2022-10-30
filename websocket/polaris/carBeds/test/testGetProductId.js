const puppeteer = require("puppeteer");

async function testGetProductId() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.polarisfurniture.com/collections/living-room-sets/products/armony-sofa-loveseat-velvet-upholstery-fushia"
  );

  const element = await page.evaluate(() => {
    const isInStockImage = document.querySelector(
      "#shopify-section-product-recommendations > section"
    ).getAttribute('data-section-settings')

    return JSON.parse(isInStockImage).productId;
  });

  console.log(element);
  await browser.close();
}

testGetProductId();
