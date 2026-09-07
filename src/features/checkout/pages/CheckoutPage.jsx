import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import {useCart} from '../../cart/CartContext.jsx'
import {createOrder} from '../services/checkoutApi.js'
import { useAuth } from '../../auth/AuthContext.jsx'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {items, totals, clearCart} = useCart()
  const {addAstroCoin} = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('saldo')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
    if (errors[name]) {
      setErrors((prev) => ({...prev, [name]: ''}))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Nama penerima wajib diisi'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon hanya boleh berisi angka'
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Nomor telepon minimal 10 digit'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat pengirim wajib diisi'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setLoading(true)
      setApiError('')
      const payLoad = {
        items,
        recipient: {
          name: formData.name,
          phone: formData.phone,
        },
        address: formData.address,
        paymentMethod,
        subtotal: totals?.subtotal || 0,
        shippingFee: totals?.shippingFee || 0,
        totalPrice: totals?.total || 0,
      }
      await createOrder(payLoad)
      const earnedCoin = Math.floor(payLoad.totalPrice * 0.01)
      if (earnedCoin > 0) {
        addAstroCoin(earnedCoin)
      }
      clearCart()
      navigate('/pesanan', {replace: true})
    } catch (err) {
      setApiError(err.message || 'Gagal membuat pesanan')
    } finally {
      setLoading(false)
    }
  }

  if (!items || items.length === 0) {
    return (
      <PageShell title="Checkout">
        <div className="py-12 text-center">
          <p className="text-slate-500">Keranjang belanja kamu masih kosong.</p>
          <button onClick={() => navigate('/')} className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Belanja Sekarang</button>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title="Checkout">
      <div className="mx-auto max-w-lg pb-12">
        {apiError && (
          <div className="mb-4 rounded-xl bg-rose-50 p-3.5 text-sm font-medium text-rose-600">
            {apiError}
          </div>
        )}
        <form onSubmit={handleCheckout} className="space-y-5">
          <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Informasi Pengiriman
            </h2>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Nama penerima</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukan nama penerima..."
                className={`w-full rounded-xl border p-3 text-sm focus:outline-none ${
                  errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Nomor Telepon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="12345678901"
                className={`w-full rounded-xl border p-3 text-sm focus:outline-none ${
                  errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Alamat Lengkap</label>
              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukan alamat lengkap..."
                className={`w-full rounded-xl border p-3 text-sm focus:outline-none ${
                  errors.address ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
              {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimasi Tiba</span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">⚡~15 Menit</span>
            </div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Ringkasan Pesanan ({totals?.totalItems || items.length} Barang)</h2>
            <div className="max-h-40 divide-y divide-slate-100 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-sm">
                  <span className="text-slate-700">
                    {item.name} <strong className="text-slate-400">x{item.qty}</strong>
                  </span>
                  <span className="font-medium text-slate-800">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-800">
              <span>Total Bayar</span>
              <span className="text-indigo-600">
                Rp{(totals?.total || 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Metode Pembayaran
            </label>
            <div className="space-y-2">
              {[
                {id: 'saldo', name: 'Saldo Astro'},
                {id: 'ewallet', name: 'E-Wallet (GoPay/OVO/Dana)'},
                {id: 'va', name: 'Virtual Account (BCA/Mandiri/BRI)'},
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm transition-all ${
                    paymentMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50/50 font-medium text-indigo-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <span>{method.name}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600"
                  />
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-95 disabled:bg-slate-300">
            {loading ? 'Memproses Pesanan...' : 'Bayar Sekarang'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}
