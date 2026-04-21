import puppeteer from 'puppeteer'
const b = await puppeteer.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', args: ['--no-sandbox'] })
const pg = await b.newPage()
await pg.setViewport({ width: 1440, height: 900 })
await pg.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise(r => setTimeout(r, 2500))
const offsetTop = await pg.evaluate(() => {
  const el = document.getElementById('o-nas')
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible'))
  return el.offsetTop
})
await pg.evaluate(top => window.scrollTo(0, top - 90), offsetTop)
await new Promise(r => setTimeout(r, 1500))
await pg.screenshot({ path: 'temporary screenshots/about-section.png' })
await b.close()
console.log('Saved')
