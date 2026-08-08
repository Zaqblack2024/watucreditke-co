const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  image: String,
  stock: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', ProductSchema)