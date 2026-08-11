import React, { useState } from 'react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+254102326232'
const EMAIL = 'wairimuwatucredit@gmail.com'

export default function MotorbikeLoanCard({ loan }) {
  const [showDetails, setShowDetails] = useState(false)

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in the ${loan.name}. Loan Amount: Ksh ${loan.loanAmount.toLocaleString()}, Monthly Payment: Ksh ${loan.monthlyPayment.toLocaleString()}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleMpesaInquiry = () => {
    const subject = `Motorbike Loan Inquiry - ${loan.name}`
    const body = `Hello,\n\nI'm interested in financing the ${loan.name}.\n\nLoan Details:\n- Model: ${loan.model}\n- Loan Amount: Ksh ${loan.loanAmount.toLocaleString()}\n- Down Payment: Ksh ${loan.downPayment.toLocaleString()}\n- Monthly Payment: Ksh ${loan.monthlyPayment.toLocaleString()}\n- Loan Term: ${loan.loanTerm} months\n\nPlease contact me to discuss payment options via M-Pesa.\n\nThank you.`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        <img
          src={loan.image || '/placeholder.png'}
          alt={loan.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/placeholder.png' }}
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-bold ${
          loan.category === 'basic' ? 'bg-green-500' :
          loan.category === 'standard' ? 'bg-orange-500' :
          'bg-red-500'
        }`}>
          {loan.category.toUpperCase()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Brand and Model */}
        <div className="mb-3">
          <p className="text-sm text-slate-500 font-semibold">{loan.brand}</p>
          <h3 className="text-xl font-bold text-slate-800">{loan.name}</h3>
          <p className="text-sm text-slate-600">{loan.model}</p>
        </div>

        {/* Key Features */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-600">Loan Amount</p>
              <p className="font-bold text-blue-600">Ksh {loan.loanAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-600">Down Payment</p>
              <p className="font-bold text-blue-600">Ksh {loan.downPayment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-600">Monthly Payment</p>
              <p className="font-bold text-green-600">Ksh {loan.monthlyPayment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-600">Loan Term</p>
              <p className="font-bold text-slate-800">{loan.loanTerm} months</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-700 mb-4">{loan.description}</p>

        {/* Features List */}
        {loan.features && loan.features.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Features:</p>
            <ul className="text-xs text-slate-600 space-y-1">
              {loan.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 transition"
        >
          {showDetails ? '- Hide Details' : '+ View More Details'}
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4 text-sm text-slate-700">
            <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
            <p className="mt-2"><strong>Total Amount to Pay:</strong> Ksh {(loan.monthlyPayment * loan.loanTerm).toLocaleString()}</p>
            <p className="mt-2"><strong>Availability:</strong> {loan.availability ? '✓ In Stock' : 'Out of Stock'}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>💬</span>
            WhatsApp Inquiry
          </button>
          <button
            onClick={handleMpesaInquiry}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>💳</span>
            M-Pesa Payment
          </button>
        </div>
      </div>
    </div>
  )
}