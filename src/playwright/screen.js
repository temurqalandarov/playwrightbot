const { chromium } = require('playwright-chromium')
const User = require('../db/models/user')
const fs = require('fs');

module.exports = async (id, slot, table) => {
  const browser = await chromium.launch({ chromiumSandbox: false })
  const context = await browser.newContext({ viewport: { width: 1198, height: 1760 } })
  // { chromiumSandbox: false }

  const cookies = await User.findOne({ chat_id: `${id}` })
  // const cookies = fs.readFileSync(`public/cookies/slot.json`)
  // const deserializedCookies = JSON.parse(cookies)
  await context.addCookies(cookies.cookie)

  const page = await context.newPage()
  await page.goto('https://onlinesoccermanager.com/Career', { waitUntil: 'networkidle0' })

  // await page.waitForSelector('.teamslot-container', { state: "visible" })
  await (await page.$$('.teamslot-container'))[slot - 1].click()
  // await page.waitForNavigation({ waitUntil: 'networkidle' })

  // const cookie = await context.cookies()
  // const cookieJson = JSON.stringify(cookie)

  // fs.writeFileSync(`public/cookies/slot.json`, cookieJson)

  await page.goto(`https://onlinesoccermanager.com/League/${table}`, { waitUntil: "networkidle" })
  await (await page.$('.table')).screenshot({ path: './public/screenshots/clip.png' })

  await browser.close()
}

