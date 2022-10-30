const puppeteer = require("puppeteer");

async function testInStockImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.polarisfurniture.com/collections/bedroom/products/gt1-race-carbed-with-led-wheels-white");

  await page.waitForSelector('.modemagic__badge');

  const element = await page.evaluate(() => {

    const isInStockImage = document.querySelector(".modemagic__badge").src

    return isInStockImage
  });

  console.log(element);
  await browser.close();
}

testInStockImage()