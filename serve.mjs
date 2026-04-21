import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = 3000
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mjs': 'application/javascript',
}

createServer(async (req, res) => {
  let pathname = req.url.split('?')[0]
  if (pathname === '/') pathname = '/index.html'
  const filePath = join(__dirname, decodeURIComponent(pathname))
  try {
    const data = await readFile(filePath)
    const ext = extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`))
