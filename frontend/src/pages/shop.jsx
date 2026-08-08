import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/products')
      .then(res => setProducts(res.data))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shop</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}