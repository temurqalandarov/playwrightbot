const { chromium } = require('playwright-chromium')
const fs = require('fs');

module.exports = async (name, slot, table) => {
  const browser = await chromium.launch({ chromiumSandbox: false })
  const context = await browser.newContext({ viewport: { width: 1120, height: 1800 } })
  // { chromiumSandbox: false }

  const cookies = fs.readFileSync(`public/cookies/${name}.json`, 'utf8')
  const deserializedCookies = JSON.parse(cookies)
  await context.addCookies(deserializedCookies)

  const page = await context.newPage()
  await page.goto('https://onlinesoccermanager.com/Career')

  await page.waitForSelector('.teamslot-container', { state: "visible" })
  await (await page.$$('.teamslot-container'))[slot - 1].click()

  await page.goto(`https://onlinesoccermanager.com/League/${table}`, { waitUntil: "networkidle0" })
  await (await page.$('.table')).screenshot({ path: './public/screenshots/clip.png' })

  await browser.close()
}

