import React from 'react'

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 bg-white dark:bg-slate-700">
      <img src={product.image || '/placeholder-phone.png'} alt={product.name} className="w-full h-48 object-cover mb-3" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-slate-600 dark:text-slate-200">Ksh {product.price}</p>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 bg-primary text-white rounded">Add to Cart</button>
        <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER.replace('+','')}`} className="px-3 py-1 border rounded">WhatsApp</a>
      </div>
    </div>
  )
}