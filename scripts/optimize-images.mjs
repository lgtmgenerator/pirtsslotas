// Converts every JPEG/PNG under public/gfx to WebP (and a 768px variant for the
// wide hero photos), then prints the dimensions of each product image so
// src/data/products.ts can declare them. Run with: npm run images
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/gfx/', import.meta.url).pathname
const QUALITY = 80
const HERO_WIDTHS = [768]

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name)
    if ((await stat(path)).isDirectory()) yield* walk(path)
    else yield path
  }
}

const sizes = {}
for await (const path of walk(ROOT)) {
  const ext = extname(path).toLowerCase()
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue
  const stem = join(dirname(path), basename(path, extname(path)))
  const image = sharp(path)
  const { width, height } = await image.metadata()
  await image.webp({ quality: QUALITY }).toFile(`${stem}.webp`)
  if (basename(stem).endsWith('-back') && width >= 1366) {
    for (const w of HERO_WIDTHS) {
      await sharp(path).resize({ width: w }).webp({ quality: QUALITY }).toFile(`${stem}-${w}.webp`)
    }
  }
  sizes[stem.slice(ROOT.length)] = [width, height]
  await unlink(path)
}
console.log(JSON.stringify(sizes, null, 2))
