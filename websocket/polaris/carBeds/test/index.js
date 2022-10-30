const helper = require("../getCarBedInfo");

async function getInfo() {
    const result = await helper.getCarBed(
        "https://www.polarisfurniture.com/collections/bedroom/products/racer-carbed-wheel-leds-not-included-white"
    );
    console.log(result);
}

getInfo();
