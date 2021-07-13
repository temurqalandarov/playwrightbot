const { chromium } = require('playwright-chromium')
const fs = require('fs')

  ; (async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://onlinesoccermanager.com')
    await (await page.waitForSelector('.btn-new', { state: 'visible' })).click()
    await (await page.waitForSelector('.btn-alternative', { state: 'visible' })).click()

    const cookies = await context.cookies()
    const cookieJson = JSON.stringify(cookies)
    fs.writeFileSync(`public/cookies/all.json`, cookieJson)

    await browser.close()
  })()

  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.text-nowrap')).map(node => node.innerHTML))
  // const p = await page.evaluate(() => Array.from(document.querySelectorAll('.font-sm')).map(node => node.innerHTML))
  // const q = await page.evaluate(() => Array.from(document.querySelectorAll('.referee-name')).map(node => node.innerHTML))
  // const o = await page.evaluate(() => Array.from(document.querySelectorAll('.alt-image')).map(node => node.alt))
