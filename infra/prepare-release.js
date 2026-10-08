import fs from 'node:fs'
import process from 'node:process'

const release = process.argv[2]
if (!/^[a-f0-9]{40}$/.test(release ?? '')) throw new Error('Expected full commit SHA')
const file = new URL('../dist/index.html', import.meta.url)
const html = fs.readFileSync(file, 'utf8')
if (!html.includes('/assets/')) throw new Error('Build has no hashed assets')
fs.writeFileSync(file, html.replaceAll('="/assets/', '="/releases/' + release + '/assets/'))
