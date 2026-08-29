import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import { useAuth } from '../AuthContext.jsx'
export default function LoginPage() {
  const navigate = useNavigate()
  const {login} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const res = login(email, password)
    if (res.ok) {
      setErrorMsg('')
      navigate('/akun')
    } else {
      setErrorMsg(res.error || 'Email atau password salah!')
  }
}
  return (
    <PageShell title="Login">
      <div className="mx-auto my-8 max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold text-slate-800">Masuk Akun</h2>
        <p className="mb-5 text-xs text-slate-500">Gunakan akun demo untuk masuk.</p>

        {errorMsg && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@demo.com" required
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-slate-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="........" required
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-slate-400 focus:outline-none" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-sky-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-600">Masuk</button>
        </form>
        <div className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Kredensial Demo:</p>
          <p>Email: <code className="text-emerald-600">demo@demo.com</code></p>
          <p>password:: <code className="text-emerald-600">password</code></p>
        </div>
      </div>
    </PageShell>
  )
}
