const { chromium } = require('playwright')
const OUT = '/tmp/claude-0/-home-user-Elasticity/98dfc076-7704-53cc-a357-1905b4c8fc00/scratchpad/shots'
;(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const shots = {
    'd-header': '.launch-header',
    'd-scorecard': '.scorecard-shell',
    'd-footer': '.launch-footer',
  }
  for (const [name, sel] of Object.entries(shots)) {
    const el = await page.$(sel)
    if (el) { await el.screenshot({ path: `${OUT}/${name}.png` }); console.log(name) }
  }
  await browser.close()
})()
