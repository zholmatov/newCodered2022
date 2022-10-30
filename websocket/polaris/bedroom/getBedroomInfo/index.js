const puppeteer = require("puppeteer");

async function getBedroom(pageURl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Configure the navigation timeout
  // await page.setDefaultNavigationTimeout(0);

  await page.goto(pageURl);
  await page.waitForSelector(".modemagic__badge");

  const elements = await page.evaluate(() => {
    let element = {
      productId: "",
      name: "",
      color: [],
      descriptionIntro: "",
      descriptionBullets: [],
      images: [],
      isInStockImage: "",
    };

    // for car color
    let colors = [];
    Array.from(document.querySelectorAll(".block-swatch-list div")).map((x) => {
      colors.push(x.querySelector(".block-swatch__item-text").innerText);
    });

    // for car name
    element.name = document.querySelector(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div.product-meta > h1"
    ).innerText;

    //for description

    const descriptionParagraph = document.querySelector(
      "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--description > div > div.card__section > div"
    );

    if (descriptionParagraph)
      element.descriptionIntro = descriptionParagraph.innerHTML;

    let bulletpoints = [];
    Array.from(
      document.querySelectorAll(
        "#shopify-section-product-template > section > div.container.container--flush > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--description > div > div.card__section > div > ul > li"
      )
    ).map((x) => {
      bulletpoints.push(x.innerText);
    });

    //for in stock image
    let imageUrls = [];
    Array.from(
      document.querySelectorAll(".product-gallery__thumbnail-list > a")
    ).map((x) => {
      imageUrls.push(x.href);
    });

    // for productId
    const productInfo = document
      .querySelector("#shopify-section-product-recommendations > section")
      .getAttribute("data-section-settings");

    element.productId = JSON.parse(productInfo).productId;

    element.isInStockImage = document.querySelector(".modemagic__badge").src;
    element.descriptionBullets = bulletpoints;
    element.images = imageUrls;
    element.color = colors;

    return element;
  });

  await browser.close();
  return elements;
}

exports.getBedroom = getBedroom;
