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
