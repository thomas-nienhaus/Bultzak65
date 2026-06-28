import QRCode from 'qrcode'
import { mkdir } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'

const baseUrl =
  process.argv[2] || 'https://thomas-nienhaus.github.io/Bultzak65'
const outDir = new URL('../qrcodes-teams/', import.meta.url)

const { teams } = JSON.parse(
  await readFile(new URL('../src/data/teams.json', import.meta.url)),
)

await mkdir(outDir, { recursive: true })

for (const team of teams) {
  const url = `${baseUrl}/#/team/${encodeURIComponent(team)}`
  const file = new URL(`${team.replace(/\s+/g, '-')}.png`, outDir)
  await QRCode.toFile(file.pathname, url, { width: 512 })
  console.log(`${team} -> ${url}`)
}

console.log(`\nDone. Team QR codes written to ${outDir.pathname}`)
