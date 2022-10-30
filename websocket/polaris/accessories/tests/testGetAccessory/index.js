const puppeteer = require("puppeteer");

async function testGetAccessory() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.polarisfurniture.com/collections/accessories/products/oslo-bergere-burgundy");
  await page.waitForSelector(".modemagic__badge");

  const elements = await page.evaluate(() => {
    let element = {
      name: "",
      color: [],
      images: [],
      isInStockImage: "",
      description: [],
    };

    // for car color
    let colors = [];
    Array.from(document.querySelectorAll(".block-swatch-list div")).map((x) => {
      colors.push(x.querySelector(".block-swatch__item-text").innerText);
    });

    // for the description
    const description = document.querySelectorAll(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--description > div > div.card__section > div > ul > li"
    );

    if (description) {
      Array.from(description).map((x) => {
        element.description.push(x.innerText);
      });
    }

    // for car name
    element.name = document.querySelector(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div.product-meta > h1"
    ).innerText;

    //for item image
    let imageUrls = [];
    Array.from(
      document.querySelectorAll(".product-gallery__thumbnail-list > a")
    ).map((x) => {
      imageUrls.push(x.href);
    });

    // for the image which shows if its in stock or no
    element.isInStockImage = document.querySelector(".modemagic__badge").src;

    element.images = imageUrls;
    element.color = colors;

    return element;
  });

  await browser.close();
  console.log(elements);
}

exports.testGetAccessory = testGetAccessory
