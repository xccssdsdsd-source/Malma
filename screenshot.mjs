import puppeteer from 'puppeteer'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'

const url = process.argv[2] || 'http://localhost:3000'
const dir = './temporary screenshots'
if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
const n = readdirSync(dir).filter(f => /^screenshot-\d+\.png$/.test(f)).length + 1

const browser = await puppeteer.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise(r => setTimeout(r, 2500))
await page.evaluate(async () => {
  await new Promise(resolve => {
    const total = document.body.scrollHeight
    let pos = 0
    const step = 400
    const tick = setInterval(() => {
      window.scrollTo(0, pos)
      pos += step
      if (pos >= total) { clearInterval(tick); resolve() }
    }, 60)
  })
})
await new Promise(r => setTimeout(r, 800))
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise(r => setTimeout(r, 600))
const path = join(dir, `screenshot-${n}.png`)
await page.screenshot({ path, fullPage: true })
await browser.close()
console.log(`Saved: ${path}`)
