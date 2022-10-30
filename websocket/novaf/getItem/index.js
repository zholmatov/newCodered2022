const puppeteer = require("puppeteer");

async function getItem(pageURl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pageURl);

  const elements = await page.evaluate(() => {
    let element = {
      productId: "",
      title: "",
      images: [],
      ifInStock: "Out of Stock",
      soonAvailable: "",
      vendor: "Nova",
    };

    // // for product title
    element.title = document.querySelector(
      "#shopify-section-product-template > section > div > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div > h1"
    ).innerText;

    //for item image
    let imageUrls = [];
    Array.from(
      document.querySelectorAll(
        "#shopify-section-product-template > section > div > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--gallery > div > div > div > div.product-gallery__carousel-wrapper > div > div > div > div > div > div > img"
      )
    ).map((x) => {
      const imageUrl = x.src;
      imageUrls.push(imageUrl.replace("_60x", "_1200x"));
    });

    // for in Stock or Out of Stock

    Array.from(
      document.querySelectorAll(
        "#shopify-section-product-template > section > div > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div > li"
      )
    ).map((x) => {
      const inStockText = x.innerText;
      if (inStockText.includes("Houston") && inStockText.includes("In Stock")) {
        element.ifInStock = "In Stock";
      }
    });

    // if available soon

    const availabilityText = document.querySelector(
      "#shopify-section-product-template > section > div > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div > p:nth-child(8) > span"
    );

    if (availabilityText) {
      element.soonAvailable = availabilityText.innerText;
    }

    // for productId
    const productInfo = document
      .querySelector(
        "#shopify-section-static-recently-viewed-products > section"
      )
      .getAttribute("data-section-settings");

    // // for price
    const RetailCodeText = document.querySelector(
      "#shopify-section-product-template > section > div > div.product-block-list.product-block-list--large > div > div.product-block-list__item.product-block-list__item--info > div > div.card__section > div > h3"
    ).innerText;

    const RetailCode = RetailCodeText.replace("RETAIL CODE: ", "").replace(
      /\s/g,
      ""
    );
    element.price = RetailCode.slice(1, -1);
    element.productId = JSON.parse(productInfo).currentProductId;
    element.images = imageUrls;

    return element;
  });

  // console.log(elements);
  await browser.close();
  return elements;
}

exports.getItem = getItem;
