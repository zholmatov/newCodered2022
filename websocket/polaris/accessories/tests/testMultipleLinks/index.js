const puppeteer = require('puppeteer')
const helper = require('../testGetAccessory')


const testMultipleLinks = async function() {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.polarisfurniture.com/collections/accessories/Accessories")

    const elements = await page.evaluate(() => {

        let bedroomURLs = []
        Array.from(document.querySelectorAll(".product-list.product-list--collection.product-list--with-sidebar > div > a")).map(x => {
            bedroomURLs.push(x.href)
        })

        return bedroomURLs
    })

    const infos = await elements.map(async (pageURL) => {
        const info = await helper.testGetAccessory(pageURL)
        return info
    })

    const accessoriesInfo = await Promise.all(infos)

    console.log(accessoriesInfo)
    await browser.close()

}

testMultipleLinks()