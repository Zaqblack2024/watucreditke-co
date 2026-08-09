import React, { useContext } from 'react'
import { CartContext } from '../contexts/cart'

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useContext(CartContext)

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+254102326232'
  const waRecipient = waNumber.replace(/\+/g, '')
  const createWhatsAppCheckoutLink = () => {
    if (!cart.length) return `https://wa.me/${waRecipient}`
    const lines = cart.map(p => `${p.name} x${p.qty || 1} — Ksh ${ (p.price || 0) * (p.qty || 1) }`)
    lines.push('')
    lines.push(`Total: Ksh ${totalPrice}`)
    lines.push('')
    lines.push('Please confirm availability and payment instructions. Thank you — Agent Joseph')
    return `https://wa.me/${waRecipient}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const contactMpesa = () => {
    const msg = [
      'To pay via M-Pesa, contact Agent Joseph:',
      'Phone: +254 102 326 232',
      'Email: wairimuwatucredit@gmail.com',
      '',
      'Send confirmation message with the product(s) and total amount.'
    ].join('\n')
    if (typeof window !== 'undefined' && window.alert) window.alert(msg)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Visit the Shop to add items.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center gap-4 p-4 border rounded">
                <img src={item.image || '/placeholder-phone.png'} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-600">Ksh {item.price} each</div>
                  <div className="mt-2">Quantity: {item.qty || 1}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Ksh {(item.price || 0) * (item.qty || 1)}</div>
                  <button onClick={() => removeFromCart(item._id)} className="mt-2 px-3 py-1 border rounded text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">Total: Ksh {totalPrice}</div>
              <div className="text-sm text-slate-600">Prices in Ksh</div>
            </div>

            <div className="flex gap-3">
              <button onClick={contactMpesa} className="px-4 py-2 border rounded">M-Pesa / Contact for payment</button>

              <a href={createWhatsAppCheckoutLink()} target="_blank" rel="noreferrer" className="px-4 py-2 bg-primary text-white rounded">
                Checkout via WhatsApp
              </a>

              <button onClick={clearCart} className="px-4 py-2 border rounded">Clear Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
