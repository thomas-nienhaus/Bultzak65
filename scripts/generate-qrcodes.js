import QRCode from 'qrcode'
import { mkdir } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'

const baseUrl =
  process.argv[2] || 'https://thomas-nienhaus.github.io/Bultzak65'
const outDir = new URL('../qrcodes/', import.meta.url)

const { caches } = JSON.parse(
  await readFile(new URL('../src/data/caches.json', import.meta.url)),
)

await mkdir(outDir, { recursive: true })

for (const cache of caches) {
  const url = `${baseUrl}/#/cache/${cache.id}`
  const file = new URL(`cache-${cache.id}.png`, outDir)
  await QRCode.toFile(file.pathname, url, { width: 512 })
  console.log(`cache ${cache.id} (${cache.name}) -> ${url}`)
}

console.log(`\nDone. QR codes written to ${outDir.pathname}`)
