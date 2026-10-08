import fs from 'node:fs'

const [file, stack] = process.argv.slice(2)
const plan = JSON.parse(fs.readFileSync(file, 'utf8'))
const changes = (plan.resource_changes ?? []).filter(
  (resource) => resource.change.actions.join(',') !== 'no-op',
)
console.log('### ' + stack + ': ' + changes.length + ' resource changes')
for (const resource of changes) {
  console.log('- ' + resource.address + ': ' + resource.change.actions.join(', '))
}
if (changes.some((resource) => resource.change.actions.includes('delete'))) {
  throw new Error('Deletion or replacement requires a separate reviewed maintenance plan.')
}
