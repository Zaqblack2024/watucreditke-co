import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MotorbikeLoanCard from '../components/MotorbikeLoanCard'

export default function MotorbikeLoanShop() {
  const [loans, setLoans] = useState([])
  const [filteredLoans, setFilteredLoans] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const response = await axios.get(import.meta.env.VITE_API_URL + '/motorbike-loans')
      setLoans(response.data)
      setFilteredLoans(response.data)
    } catch (err) {
      console.error('Failed to fetch loans:', err)
      // Fallback to sample data for demo
      setLoans(getSampleLoans())
      setFilteredLoans(getSampleLoans())
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredLoans(loans)
    } else {
      setFilteredLoans(loans.filter(loan => loan.category === category))
    }
  }

  const getSampleLoans = () => [
    {
      _id: '1',
      name: 'Honda CB 150',
      brand: 'Honda',
      model: 'CB 150',
      category: 'basic',
      loanAmount: 150000,
      monthlyPayment: 3500,
      loanTerm: 48,
      interestRate: 8,
      downPayment: 30000,
      description: 'Reliable and fuel-efficient motorbike for daily commuting',
      features: ['Fuel Efficient', '150cc Engine', 'LED Headlight', 'Manual Transmission'],
      availability: true,
      image: '/images/honda.jpg'
    },
    {
      _id: '2',
      name: 'TVS Apache RTR',
      brand: 'TVS',
      model: 'Apache RTR 160',
      category: 'standard',
      loanAmount: 200000,
      monthlyPayment: 4800,
      loanTerm: 48,
      interestRate: 9,
      downPayment: 40000,
      description: 'Sporty performance motorbike with modern features',
      features: ['160cc Engine', 'Digital Instrument Cluster', 'ABS', 'Sport Design'],
      availability: true,
      image: '/images/tvs.jpg'
    },
    {
      _id: '3',
      name: 'Boxer BF100',
      brand: 'Boxer',
      model: 'BF 100',
      category: 'basic',
      loanAmount: 120000,
      monthlyPayment: 2800,
      loanTerm: 48,
      interestRate: 7.5,
      downPayment: 25000,
      description: 'Budget-friendly workhorse motorbike',
      features: ['100cc Engine', 'Durable Frame', 'Easy Maintenance', 'Economical'],
      availability: true,
      image: '/images/boxer.jpg'
    },
    {
      _id: '4',
      name: 'Spiro Bikes Urban',
      brand: 'Spiro Bikes',
      model: 'Urban 200',
      category: 'premium',
      loanAmount: 280000,
      monthlyPayment: 6800,
      loanTerm: 48,
      interestRate: 10,
      downPayment: 60000,
      description: 'Premium urban commuter with latest technology',
      features: ['200cc Engine', 'Smart Display', 'Fast Charging', 'Premium Build'],
      availability: true,
      image: '/images/spiro.jpg'
    },
    {
      _id: '5',
      name: 'Ranger Pro',
      brand: 'Ranger',
      model: 'Pro 200',
      category: 'premium',
      loanAmount: 300000,
      monthlyPayment: 7200,
      loanTerm: 48,
      interestRate: 10.5,
      downPayment: 70000,
      description: 'Adventure-ready motorbike with off-road capabilities',
      features: ['200cc Engine', 'All-Terrain Tires', 'Heavy-duty Suspension', 'Premium Comfort'],
      availability: true,
      image: '/images/ranger.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Motorbike Loan Products</h1>
          <p className="text-xl text-blue-100">Easy financing for your dream motorbike</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'all', label: 'All Products' },
              { value: 'basic', label: 'Basic (Ksh 120K-150K)' },
              { value: 'standard', label: 'Standard (Ksh 200K)' },
              { value: 'premium', label: 'Premium (Ksh 280K+)' }
            ].map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryFilter(cat.value)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loans Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredLoans.map(loan => (
              <MotorbikeLoanCard key={loan._id} loan={loan} />
            ))}
          </div>
        )}

        {!loading && filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No products available in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}