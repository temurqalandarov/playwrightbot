const { chromium } = require('playwright-chromium')
const fs = require('fs')

module.exports = async (name, password) => {
  const browser = await chromium.launch({ chromiumSandbox: false })

  const context = await browser.newContext()

  const cookie = fs.readFileSync(`public/cookies/all.json`)
  const deserializedCookies = JSON.parse(cookie)
  await context.addCookies(deserializedCookies)

  const page = await context.newPage()
  await page.goto('https://onlinesoccermanager.com/Login')

  await (await page.waitForSelector('#manager-name', { state: 'visible' })).fill(name)
  await page.fill('#password', password)
  await page.press('body', 'Enter')
  await page.waitForNavigation()

  const cookies = await context.cookies()
  // const cookieJson = JSON.stringify(cookies)

  await browser.close()
  return cookies
}

  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.text-nowrap')).map(node => node.innerHTML))
  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.referee-name')).map(node => node.innerHTML))
  // const o = await page.evaluate(() => Array.from(document.querySelectorAll('.alt-image')).map(node => node.alt))
