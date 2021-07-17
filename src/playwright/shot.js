const { chromium } = require('playwright-chromium')
const fs = require('fs')

  ; (async () => {
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const cookie = fs.readFileSync(`src/playwright/test2.json`)

    const deserializedCookies = JSON.parse(cookie)
    await context.addCookies(deserializedCookies)
    const page = await context.newPage()

    await page.setViewportSize({
      width: 1198,
      height: 1780,
    })
    await page.goto(`https://onlinesoccermanager.com/League/Results`, { waitUntil: "networkidle" })
    const element = await page.waitForSelector('.table')
    await element.screenshot({ path: 'src/playwright/clip2.png' })

    await browser.close()
  })()

