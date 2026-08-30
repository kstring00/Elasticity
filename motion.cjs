const { chromium } = require('playwright')
const EXE='/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
;(async () => {
  const b = await chromium.launch({ args:['--no-sandbox'], executablePath: EXE })

  // 1. Normal motion: week4 should start hidden, then populate
  const c1 = await b.newContext({ viewport:{width:1440,height:900} })
  const p1 = await c1.newPage()
  await p1.goto('http://localhost:3100/', { waitUntil:'domcontentloaded' })
  const snap = async () => p1.$$eval('.week4', els => els.map(e => getComputedStyle(e).opacity));
  await p1.waitForTimeout(60)
  console.log('normal @60ms  :', (await snap()).join(','))
  await p1.waitForTimeout(300)
  console.log('normal @360ms :', (await snap()).join(','))
  await p1.waitForTimeout(1200)
  console.log('normal @1.5s  :', (await snap()).join(','))
  // re-scroll must not re-run
  await p1.evaluate(() => window.scrollTo(0, 4000)); await p1.waitForTimeout(300)
  await p1.evaluate(() => window.scrollTo(0, 0)); await p1.waitForTimeout(300)
  console.log('after rescroll:', (await snap()).join(','))
  await c1.close()

  // 2. Reduced motion: filled immediately, no transition
  const c2 = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' })
  const p2 = await c2.newPage()
  await p2.goto('http://localhost:3100/', { waitUntil:'domcontentloaded' })
  await p2.waitForTimeout(50)
  console.log('reduced @50ms :', (await p2.$$eval('.week4', els => els.map(e => getComputedStyle(e).opacity))).join(','))
  console.log('reduced transition:', await p2.$eval('.week4', e => getComputedStyle(e).transitionDuration))
  console.log('animated elements w/ non-zero duration:', await p2.evaluate(() =>
    Array.from(document.querySelectorAll('body *')).filter(e => {
      const cs = getComputedStyle(e)
      return parseFloat(cs.animationDuration) > 0.01 || parseFloat(cs.transitionDuration) > 0.01
    }).length))
  await b.close()
})()
