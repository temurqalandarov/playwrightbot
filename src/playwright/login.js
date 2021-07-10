const { chromium } = require('playwright-chromium')
const fs = require('fs');

module.exports = async (name, password) => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  // { chromiumSandbox: false }
  const page = await context.newPage()
  await page.goto('https://onlinesoccermanager.com')

  await (await page.waitForSelector('.btn-new', { state: 'visible' })).click()

  await (await page.waitForSelector('.btn-alternative', { state: 'visible' })).click()

  await page.fill('#manager-name', `${name}`)
  await page.fill('#password', `${password}`)
  await page.press('body', 'Enter')
  await page.waitForNavigation({ waitUntil: 'networkidle' })

  const cookies = await context.cookies()
  const cookieJson = JSON.stringify(cookies)

  fs.writeFileSync(`public/cookies/${name}.json`, cookieJson)

  await browser.close()
}

  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.text-nowrap')).map(node => node.innerHTML))
  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.referee-name')).map(node => node.innerHTML))
  // const o = await page.evaluate(() => Array.from(document.querySelectorAll('.alt-image')).map(node => node.alt))
