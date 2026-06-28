import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const imgDir = join(__dirname, '..', 'public', 'img')

const KB = 1024
const MAX_SIZE_KB = 60
const QUALITY = 65

let totalSaved = 0
let totalFiles = 0

function walk(dir) {
  let results = []
  const list = readdirSync(dir)
  for (const file of list) {
    const full = join(dir, file)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results = results.concat(walk(full))
    } else {
      results.push(full)
    }
  }
  return results
}

async function compress(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return

  const originalSize = statSync(filePath).size
  if (originalSize < 10 * KB) return

  const tempPath = filePath + '.tmp'

  try {
    let pipeline = sharp(filePath)

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, palette: true })
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
    }

    await pipeline.toFile(tempPath)
    const newSize = statSync(tempPath).size

    if (newSize < originalSize) {
      const fs = await import('fs')
      fs.renameSync(tempPath, filePath)
      const saved = ((originalSize - newSize) / KB).toFixed(1)
      const pct = ((1 - newSize / originalSize) * 100).toFixed(1)
      console.log(`  ✓ ${saved} KB saved (${pct}%) — ${filePath.replace(imgDir, '')}`)
      totalSaved += originalSize - newSize
      totalFiles++
    } else {
      const fs = await import('fs')
      fs.unlinkSync(tempPath)
    }
  } catch (err) {
    console.error(`  ✗ Error compressing ${filePath}: ${err.message}`)
  }
}

console.log('Compressing images...\n')
const files = walk(imgDir)
const results = await Promise.allSettled(files.map(compress))
console.log(`\nDone! ${totalFiles} images compressed, ${(totalSaved / KB / KB).toFixed(2)} MB total saved`)
