const { chromium } = require('playwright-chromium')
const fs = require('fs')
module.exports = async (name, password) => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const cookie = fs.readFileSync(`src/playwright/all.json`)

  const deserializedCookies = JSON.parse(cookie)
  await context.addCookies(deserializedCookies)
  const page = await context.newPage()

  await page.goto('https://onlinesoccermanager.com/Login')
  await (await page.waitForSelector('#manager-name', { state: 'visible' })).fill(name)
  await page.fill('#password', password)
  await page.press('body', 'Enter')

  try {
    await page.waitForNavigation({ timeout: 12000 })
    var login = await context.cookies()
  }
  catch (e) {
    console.log(e)
    return 0
  }
  finally {
    await browser.close()
  }
  return login
}
