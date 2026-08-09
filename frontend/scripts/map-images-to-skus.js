#!/usr/bin/env node
/**
 * Usage:
 *  node map-images-to-skus.js --imagesDir=./frontend/public/images --products=./frontend/data/products.json --out=./frontend/data/mapped-products.json
 *
 * Reads image filenames and product JSON, attempts to match images to product sku/_id/name,
 * and writes a mapped-products.json where each product has image set to "/images/<filename>" or a placeholder.
 */

const fs = require('fs')
const path = require('path')

function parseArgs() {
  const args = {}
  process.argv.slice(2).forEach(arg => {
    const m = arg.match(/^--([^=]+)=(.*)$/)
    if (m) args[m[1]] = m[2]
  })
  return args
}

function normalize(s) {
  return (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function main() {
  const { imagesDir, products, out } = parseArgs()
  if (!imagesDir || !products || !out) {
    console.error('Usage: node map-images-to-skus.js --imagesDir=./frontend/public/images --products=./frontend/data/products.json --out=./frontend/data/mapped-products.json')
    process.exit(1)
  }

  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory does not exist:', imagesDir)
    process.exit(1)
  }

  const imageFiles = fs.readdirSync(imagesDir).filter(f => {
    const ext = path.extname(f).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
  })

  const raw = fs.readFileSync(products, 'utf8')
  const productsArr = JSON.parse(raw)
  const mapped = productsArr.map(p => {
    const candidates = []
    if (p.sku) candidates.push(normalize(p.sku))
    if (p._id) candidates.push(normalize(p._id))
    if (p.name) candidates.push(normalize(p.name).slice(0, 30))
    let matched = null
    for (const img of imageFiles) {
      const n = normalize(img)
      if (candidates.some(c => c && n.includes(c))) {
        matched = img
        break
      }
    }
    if (matched) {
      p.image = `/images/${matched}`
    } else {
      p.image = p.image || '/placeholder-phone.png'
    }
    return p
  })

  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify(mapped, null, 2), 'utf8')
  console.log(`Wrote ${out} with ${mapped.length} products (images dir: ${imagesDir})`)
}

main().catch(err => {
  console.error(err)
  process.exit(2)
})
