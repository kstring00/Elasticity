const { chromium } = require('playwright')
;(async () => {
  const b = await chromium.launch({ args:['--no-sandbox'], executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
  const p = await (await b.newContext()).newPage()
  const failed = []
  p.on('requestfailed', r => failed.push(r.url() + ' :: ' + (r.failure()||{}).errorText))
  p.on('response', r => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()) })
  await p.goto('http://localhost:3100/', { waitUntil:'networkidle' })
  await p.waitForTimeout(1500)
  console.log('FAILED REQUESTS:', failed.length ? failed.join('\n  ') : 'none')
  console.log(await p.evaluate(() => {
    const html = document.documentElement
    const cs = getComputedStyle(html)
    const num = document.querySelector('.num')
    return JSON.stringify({
      bodyBg: getComputedStyle(document.body).backgroundColor,
      tokenPaper: cs.getPropertyValue('--paper').trim(),
      varMono: cs.getPropertyValue('--font-mono').trim(),
      varSans: cs.getPropertyValue('--font-sans').trim(),
      numFont: num ? getComputedStyle(num).fontFamily : 'none',
      sheets: Array.from(document.styleSheets).map(s => (s.href||'inline') + ' rules=' + (()=>{try{return s.cssRules.length}catch(e){return 'X'}})()),
    }, null, 2)
  }))
  await b.close()
})()
