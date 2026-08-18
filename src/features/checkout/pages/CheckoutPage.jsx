import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import {useCart} from '../../cart/CartContext.jsx'
import {createOrder} from '../services/checkoutApi.js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {cart, totals, clearCart} = useCart()
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('saldo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!address.trim()) {
      setError('Alamat pengirim wajib diisi')
      return
    }
    try {
      setLoading(true)
      setError('')
      const payLoad = {
        items:cart,
        address,
        paymentMethod,
        subtotal: totals?.subtotal || 0,
        shippingFee: totals?.shippingFee || 0,
        totalPrice: totals?.grandTotal || totals?.subtotal || 0,
      }
      await createOrder(payLoad)
      clearCart()
      navigate('/account/orders', {replace: true})
    } catch (err) {
      setError(err.message || 'Gagal membuat pesanan')
    } finally {
      setLoading(false)
    }
  }
  if (!cart || cart.length === 0) {
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
        {error && (
          <div className="mb-4 rounded-xl  bg-rose-50 p-3.5 text-sm font-medium text-rose-600">
            {error}
          </div>
        )}
        <form onSubmit={handleCheckout} className="space-y-5">
          <div className="rounded-2xl border-slate-100 bg-white p-4 shadow-sm">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Alamat Pengirim
            </label>
            <textarea
              rows="3"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukan alamat lengkap pengirim..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimasi Tiba</span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">⚡~15 Menit</span>
            </div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Ringkasan Pesanan ({totals?.totalItems || cart.length} Barang)</h2>
            <div className="max-h-40 divide-y divide-slate-100 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-sm">
                  <span className="text-slate-700">
                    {item.name} <strong className="text-slate-400">x{item.quantity}</strong>
                  </span>
                  <span className="font-medium text-slate-800">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3 text-sm font-bold text-slate-800 flex justify-between">
              <span>Total Bayar</span>
              <span className="text-indigo-600">
                Rp{(totals?.grandTotal || totals?.subtotal || 0).toLocaleString('id-ID')}
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
                  }`}>
                  <span>{method.name}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-indigo-600" />
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
