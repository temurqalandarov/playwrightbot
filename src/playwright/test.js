const { chromium } = require('playwright-chromium')
const fs = require('fs')

  ; (async () => {
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const cookie = fs.readFileSync(`src/playwright/all.json`)

    const deserializedCookies = JSON.parse(cookie)
    await context.addCookies(deserializedCookies)
    const page = await context.newPage()

    await page.goto('https://onlinesoccermanager.com/Login')
    await (await page.waitForSelector('#manager-name', { state: 'visible' })).fill('webdev')
    await page.fill('#password', '10122000timur')

    await page.press('body', 'Enter')
    const claim = await page.$('#claim-achievement-btn')
    if (claim)
      await page.click('#claim-achievement-btn')

    await page.waitForSelector('.teamslot-container', { state: "visible" })
    await (await page.$$('.teamslot-container'))[1].click()
    await page.waitForNavigation()

    const cookies = await context.cookies()
    const cookieJson = JSON.stringify(cookies)
    fs.writeFileSync(`src/playwright/test2.json`, cookieJson)

    await browser.close()
  })()
