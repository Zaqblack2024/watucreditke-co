import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to WATUCREDITKE</h1>
      <p className="mb-6">Affordable smartphones on installment — lipa mdogo mdogo.</p>
      <Link to="/shop" className="inline-block px-4 py-2 bg-primary text-white rounded">Shop Now</Link>
    </div>
  )
}