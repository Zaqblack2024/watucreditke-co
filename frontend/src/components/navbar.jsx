import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="bg-white dark:bg-slate-900 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-primary">watucredite-cash</Link>
        <div className="flex items-center gap-4">
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/login" className="px-3 py-1 bg-accent text-white rounded">Login</Link>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded border"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
