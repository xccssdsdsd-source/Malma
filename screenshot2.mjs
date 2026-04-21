import puppeteer from 'puppeteer'
import { existsSync, mkdirSync } from 'fs'

const dir = './temporary screenshots'
if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 3000))

await page.screenshot({ path: dir + '/hero-viewport.png', fullPage: false })

await page.evaluate(() => window.scrollTo(0, 920))
await new Promise(r => setTimeout(r, 600))
await page.screenshot({ path: dir + '/onas-section.png', fullPage: false })

await page.evaluate(() => window.scrollTo(0, document.getElementById('kontakt').offsetTop))
await new Promise(r => setTimeout(r, 600))
await page.screenshot({ path: dir + '/kontakt-section.png', fullPage: false })

await browser.close()
console.log('Done')
