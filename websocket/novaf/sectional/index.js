const webUrl = "https://www.novawf.com/collections/nova-sectionals";

const puppeteer = require("puppeteer");
const helper = require("../getItem");

const getSectional = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(webUrl);

  const elements = await page.evaluate(() => {
    let sectionalURLs = [];
    Array.from(
      document.querySelectorAll(
        "#shopify-section-collection-template > section > div.container.container--flush > div.layout > div:nth-child(2) > div > div > div > div.product-list.product-list--collection.product-list--with-sidebar > div > a"
      )
    ).map((x) => {
      sectionalURLs.push(x.href);
    });
    return sectionalURLs;
  });

  const parts = helper2.distributeEllements(elements);

  let mainInfo = [];

  for (let k = 0; k < parts.length; k++) {
    const infos = parts[k].map(async (pageURL) => {
      const info = await helper.getItem(pageURL);
      return info;
    });
    const accessoriesInfo = await Promise.all(infos);
    mainInfo = mainInfo.concat(accessoriesInfo);
  }

  await browser.close();
  return mainInfo;
};

exports.getSectional = getSectional;
