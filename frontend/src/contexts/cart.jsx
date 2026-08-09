import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p._id === product._id)
      if (existing) {
        return prev.map(p => p._id === product._id ? { ...p, qty: (p.qty || 1) + 1 } : p)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    try { alert(`${product.name} added to cart`) } catch {}
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p._id !== productId))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((s, p) => s + (p.qty || 1), 0)

  const totalPrice = cart.reduce((s, p) => s + (p.price || 0) * (p.qty || 1), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
