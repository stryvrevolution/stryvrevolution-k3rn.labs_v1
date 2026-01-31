#!/usr/bin/env ts-node
import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

async function sha256File(filePath: string) {
  const buf = await fs.readFile(filePath)
  return createHash('sha256').update(buf).digest('hex')
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => {
      const res = path.join(dir, e.name)
      return e.isDirectory() ? listFiles(res) : Promise.resolve([res])
    }),
  )
  return files.flat()
}

async function main() {
  const root = path.resolve(process.cwd(), 'zip-master')
  const proofs = path.join(root, '99_PROOFS')
  const hashesFile = path.join(proofs, 'hashes.json')

  const targets = [
    '00_README.md',
    '01_CONTEXT',
    '02_CORTEX',
    '03_DECISIONS',
    '04_RECOMMENDATIONS',
    '05_EXECUTION',
    '06_LABS',
  ]

  const files: { path: string; sha256: string }[] = []
  for (const t of targets) {
    const abs = path.join(root, t)
    try {
      const stats = await fs.stat(abs)
      if (stats.isDirectory()) {
        const list = await listFiles(abs)
        for (const f of list) {
          files.push({ path: path.relative(root, f), sha256: await sha256File(f) })
        }
      } else {
        files.push({ path: t, sha256: await sha256File(abs) })
      }
    } catch {}
  }

  await fs.writeFile(hashesFile, JSON.stringify({ files }, null, 2), 'utf8')
  console.log(`Wrote ${files.length} hashes to ${hashesFile}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
