const puppeteer = require("puppeteer");
const helper = require("./getBedroomInfo");
const helper2 = require("../helper/distributeElements");

const getBedroomsInfo = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Configure the navigation timeout
  // await page.setDefaultNavigationTimeout(0);

  await page.goto("https://www.polarisfurniture.com/collections/bedroom-1");

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

  const parts = helper2.distributeEllements(elements);

  let mainInfo = [];

  for (let k = 0; k < parts.length; k++) {
    const infos = parts[k].map(async (pageURL) => {
      const info = await helper.getBedroom(pageURL);
      return info;
    });
    const accessoriesInfo = await Promise.all(infos);
    mainInfo = mainInfo.concat(accessoriesInfo);
  }

  await browser.close();
  return mainInfo;
};

exports.getBedroomsInfo = getBedroomsInfo;
