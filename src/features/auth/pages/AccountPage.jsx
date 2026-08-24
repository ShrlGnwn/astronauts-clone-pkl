import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function AccountPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      navigate('/login')
    }
  }, [navigate])
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  if (!user) return null

  return (
    <PageShell title="Akun Saya">
      <div className="mx-auto my-6 max-w-md space-y-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-xl font-bold text-sky-600">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{user.name}</h3>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">Saldo Astro</p>
            <p className="mt-1 text-base font-bold text-slate-800">
              Rp {user.saldo ? user.saldo.toLocaleString('id-ID') : '0'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">Astro Coin</p>
            <p className="mt-1 text-base font-bold text-sky-500">
              🪙 {user.astroCoin ? user.astroCoin.toLocaleString('id-ID') : '0'} Coin
            </p>
          </div>
        </div>
        <button onClick={handleLogout} type="button"
        className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100">
          Keluar dari Akun
        </button>
      </div>
    </PageShell>
  )
}
