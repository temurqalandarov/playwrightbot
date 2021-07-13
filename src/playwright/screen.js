const { chromium } = require('playwright-chromium')
const User = require('../db/models/user')

module.exports = async (id, slot, table) => {
  const browser = await chromium.launch({ chromiumSandbox: false })
  try {
    switch (table) {
      case 'Natijalar':
        table = 'Results'
        break
      case 'Anons':
        table = 'Fixtures'
        break
      case 'Turnir jadvali':
        table = 'Standings'
        break
      default: throw new Error('Xato!')
    }
    const context = await browser.newContext()
    const cookies = await User.findOne({ chat_id: `${id}` })
    await context.addCookies(cookies.cookie)
    const page = await context.newPage()
    await page.goto('https://onlinesoccermanager.com/Career')

    await page.waitForSelector('.teamslot-container', { state: "visible" })
    await (await page.$$('.teamslot-container'))[slot - 1].click()

    await page.setViewportSize({
      width: 1198,
      height: 1780,
    })
    await page.goto(`https://onlinesoccermanager.com/League/${table}`, { waitUntil: "networkidle" })
    const element = await page.waitForSelector('.table')
    await element.screenshot({ path: './public/screenshots/clip.png' })
  }
  catch (e) {
    console.log(e)
    return 1
  }
  finally {
    await browser.close()
  }
}

