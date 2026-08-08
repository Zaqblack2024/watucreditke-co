import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      nav('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}