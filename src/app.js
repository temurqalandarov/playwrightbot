const env = process.env
const { chromium } = require('playwright-chromium')

module.exports = async () => {
  const browser = await chromium.launch({ chromiumSandbox: false })
  const page = await browser.newPage()
  await page.goto('https://onlinesoccermanager.com/Login')

  await page.click('.btn-new')
  await page.click('.btn-alternative')

  // await (await page.waitForSelector('.btn-alternative', { state: 'visible' })).click()

  await page.fill('#manager-name', 'webdev')
  await page.fill('#password', '10122000timur')
  await page.click('#login')

  // await page.waitForSelector('.teamslot-container', { state: "visible" })
  const k = await page.$$('.teamslot-container')
  await k[1].click()

  await page.goto(`https://onlinesoccermanager.com/League/${env.NATIJA}`)
  // , { waitUntil: "domcontentloaded" }
  // await page.waitForSelector('.table', { state: "visible" })

  const img = await page.screenshot({ path: './public/clip.png', fullPage: true, clip: { x: 10, y: 264, width: 833, height: 638 } })
  // console.log(img)

  await browser.close()
  // return img
}

// await page.screenshot({ path: './public/clip.png', fullPage: true, clip: { x: 10, y: 264, width: 833, height: 930 } })
  // await page.screenshot({ path: './public/clip.png', fullPage: true, clip: { x: 10, y: 264, width: 833, height: 638 } })




  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.text-nowrap')).map(node => node.innerHTML))

  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // console.log(p)
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.referee-name')).map(node => node.innerHTML))
  // console.log(q)
  // const o = await page.evaluate(() => Array.from(document.querySelectorAll('.alt-image')).map(node => node.alt))
  // console.log(o)

  // await page.context().storageState({ path: 'state.json' });