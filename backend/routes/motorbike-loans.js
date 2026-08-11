const express = require('express')
const router = express.Router()
const MotorbikeLoan = require('../models/motorbikeLoan')
const LoanBooking = require('../models/loanBooking')

// Get all motorbike loans
router.get('/', async (req, res) => {
  try {
    const loans = await MotorbikeLoan.find()
    res.json(loans)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get motorbike loan by ID
router.get('/:id', async (req, res) => {
  try {
    const loan = await MotorbikeLoan.findById(req.params.id)
    if (!loan) return res.status(404).json({ error: 'Loan not found' })
    res.json(loan)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get loans by category
router.get('/category/:category', async (req, res) => {
  try {
    const loans = await MotorbikeLoan.find({ category: req.params.category })
    res.json(loans)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create loan booking
router.post('/bookings', async (req, res) => {
  try {
    const booking = new LoanBooking(req.body)
    await booking.save()
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all bookings (admin view)
router.get('/bookings/all', async (req, res) => {
  try {
    const bookings = await LoanBooking.find()
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router