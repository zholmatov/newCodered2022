const puppeteer = require("puppeteer");
const helper = require("../getItem");

const getCarBedsInfo = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Configure the navigation timeout
  // await page.setDefaultNavigationTimeout(0);

  await page.goto("https://www.polarisfurniture.com/collections/bedroom");

  const elements = await page.evaluate(() => {
    let bedroomURLs = [];
    Array.from(
      document.querySelectorAll(
        ".product-list.product-list--collection.product-list--with-sidebar > div > a"
      )
    ).map((x) => {
      bedroomURLs.push(x.href);
    });

    return bedroomURLs;
  });

  const infos = await elements.map(async (pageURL) => {
    const info = await helper.getItem(pageURL);
    return info;
  });

  const carBedInfos = await Promise.all(infos);

  await browser.close();
  return carBedInfos;
};

exports.getCarBedsInfo = getCarBedsInfo;
