import React from 'react'

export default function Contact() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+254102326232'
  const waLink = `https://wa.me/${waNumber.replace(/\+/g, '')}`
  const mailto = 'mailto:wairimuwatucredit@gmail.com?subject=Inquiry%20from%20WatuCredit%20Site'

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">👋 Hello / Habari! 👋</h1>

      <p className="mb-4">❤️🤝 Thank you for contacting WAIRIMU JOSEPH — your Watu Credit Limited Agent 🙏✨</p>
      <p className="mb-4">❤️🤝 Asante kwa kuwasiliana na Agent Joseph – Watu Credit Limited 🙏✨</p>

      <div className="mb-6">
        <p><strong>📞 Official Helpline / Namba Rasmi:</strong></p>
        <p>📲 +254 102 326 232</p>
        <p>✉️ wairimuwatucredit@gmail.com</p>
      </div>

      <div className="flex gap-3">
        <a href={waLink} target="_blank" rel="noreferrer" className="px-4 py-2 border rounded">Message on WhatsApp</a>
        <a href={mailto} className="px-4 py-2 bg-primary text-white rounded">Email Agent</a>
      </div>

      <div className="mt-6 prose">
        <h3>Payment / M-Pesa</h3>
        <p>
          For M-Pesa payments, contact the agent on the phone or WhatsApp above. Provide the product name(s) and total amount — the agent will give you the Paybill / Till or handle the payment arrangement.
        </p>
      </div>
    </div>
  )
}
