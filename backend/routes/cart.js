const express = require('express')
const auth = require('../middleware/auth')
const Cart = require('../models/Cart')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  res.json(cart || { items: [] })
})

router.post('/add', auth, async (req, res) => {
  const { productId, qty = 1, price } = req.body
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] })
  const existing = cart.items.find(i => i.product.toString() === productId)
  if (existing) existing.qty += qty
  else cart.items.push({ product: productId, qty, price })
  await cart.save()
  res.json(cart)
})

router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) return res.json({ items: [] })
  cart.items = cart.items.filter(i => i.product.toString() !== productId)
  await cart.save()
  res.json(cart)
})

module.exports = router