const mongoose = require('mongoose')

const MotorbikeLoanSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model: String,
  category: String, // 'basic', 'standard', 'premium'
  loanAmount: Number,
  monthlyPayment: Number,
  loanTerm: Number, // in months
  interestRate: Number,
  downPayment: Number,
  image: String,
  description: String,
  features: [String],
  availability: Boolean,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MotorbikeLoan', MotorbikeLoanSchema)