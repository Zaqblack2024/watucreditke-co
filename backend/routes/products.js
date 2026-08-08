const express = require('express')
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const router = express.Router()

// public
router.get('/', async (req, res) => {
  const products = await Product.find().limit(50)
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

// admin create — protect in production
router.post('/', auth, async (req, res) => {
  // optionally check req.user.isAdmin
  const product = await Product.create(req.body)
  res.json(product)
})

router.put('/:id', auth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

router.delete('/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

module.exports = router