import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-slate-700 dark:text-slate-300">
        © {new Date().getFullYear()} WATUCREDITKE — Buy phones lipa mdogo mdogo. Contact: <a href="https://wa.me/254700000000" className="text-primary">WhatsApp</a>
      </div>
    </footer>
  )
}