const mongoose = require('mongoose')

const LoanBookingSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  motorbikeLoanId: mongoose.Schema.Types.ObjectId,
  loanProductName: String,
  desiredDownPayment: Number,
  preferredPaymentMethod: String, // 'mpesa' or 'whatsapp-inquiry'
  bookingStatus: { type: String, default: 'pending' }, // pending, confirmed, rejected
  notes: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('LoanBooking', LoanBookingSchema)