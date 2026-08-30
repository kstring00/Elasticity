const { chromium } = require('playwright')
;(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3100/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  const out = await page.evaluate(() => {
    const res = { radii: [], amber: [], numbersNotMono: [], monoOk: [], contrast: [] }
    const AMBER = ['rgb(200, 134, 13)', 'rgb(153, 103, 10)', 'rgb(220, 148, 14)']
    const els = Array.from(document.querySelectorAll('body *'))
    for (const el of els) {
      const cs = getComputedStyle(el)
      // radii
      for (const p of ['borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius']) {
        const v = cs[p]
        const px = parseFloat(v)
        if (v.includes('%') || (!isNaN(px) && px > 4)) {
          res.radii.push(el.tagName + '.' + (el.className||'') + ' ' + p + '=' + v)
        }
      }
      // amber usage
      const txt = (el.textContent||'').trim()
      const own = Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim()
      if (AMBER.includes(cs.color) && own) {
        const isNumeric = /^[\s$€£]*[\d.,:×–—\-\/+%]+[\s\w°]*$/.test(own) || /^\d/.test(own)
        if (!isNumeric) res.amber.push((el.className||el.tagName) + ' :: "' + own.slice(0,40) + '"')
      }
      // numeric text not in mono
      if (own && /\d/.test(own)) {
        const mono = /JetBrains/i.test(cs.fontFamily)
        const entry = (el.className||el.tagName) + ' :: "' + own.slice(0,44) + '"'
        if (mono) res.monoOk.push(entry); else res.numbersNotMono.push(entry)
      }
    }
    return res
  })

  console.log('--- border-radius > 4px or % ---')
  console.log(out.radii.length ? out.radii.join('\n') : '  (none)')
  console.log('\n--- amber on non-numeric text ---')
  console.log(out.amber.length ? out.amber.join('\n') : '  (none)')
  console.log('\n--- numeric text NOT in JetBrains Mono ---')
  console.log(out.numbersNotMono.length ? out.numbersNotMono.join('\n') : '  (none)')
  console.log('\n--- numeric text in mono: ' + out.monoOk.length + ' elements ---')
  console.log(out.monoOk.slice(0,14).join('\n'))
  await browser.close()
})()
