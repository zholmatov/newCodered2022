const puppeteer = require("puppeteer");

async function getItem(pageURl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pageURl);
  await page.waitForSelector(".modemagic__badge");

  const elements = await page.evaluate(() => {
    let element = {
      productId: "",
      name: "",
      color: [],
      images: [],
      isInStockImage: "",
      descriptionHtml: "",
      price: 0,
    };

    // for car color
    let colors = [];
    Array.from(document.querySelectorAll(".block-swatch-list div")).map((x) => {
      colors.push(x.querySelector(".block-swatch__item-text").innerText);
    });

    // for the description
    const description = document.querySelector(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--description > div > div.card__section > div"
    );

    if (description) {
      element.descriptionHtml = description.innerHTML;
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

    // for productId
    const productInfo = document
      .querySelector("#shopify-section-product-recommendations > section")
      .getAttribute("data-section-settings");

    // for price
    const SKU = document.querySelector(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div.product-meta > div.product-meta__reference > span > span"
    ).innerText;

    element.price = SKU.slice(1);
    element.productId = JSON.parse(productInfo).productId;
    element.images = imageUrls;
    element.color = colors;

    return element;
  });

  await browser.close();
  return elements;
}

exports.getItem = getItem;
