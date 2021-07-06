const env = process.env
const { chromium } = require('playwright-chromium')

module.exports = async () => {
  const browser = await chromium.launch({ chromiumSandbox: false })
  const page = await browser.newPage()
  await page.goto('https://onlinesoccermanager.com/Login')

  await page.click('.btn-new')

  await (await page.waitForSelector('.btn-alternative', { state: 'visible' })).click()

  await page.fill('#manager-name', `${env.NAME}`)
  await page.fill('#password', `${env.PASSWORD}`)
  await page.click('#login')

  await page.waitForSelector('.teamslot-container', { state: "visible" })
  await (await page.$$('.teamslot-container'))[1].click()

  await page.goto(`https://onlinesoccermanager.com/League/${env.NATIJA}`)
  await page.waitForSelector('.table', { state: "visible" })

  await page.screenshot({ path: './public/clip.png', fullPage: true, clip: { x: 10, y: 264, width: 833, height: 638 } })

  await browser.close()
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