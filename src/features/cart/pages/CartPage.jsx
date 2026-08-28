import React from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import {useCart} from '../CartContext.jsx'
import CartItemRow from '../components/CartItemRow.jsx'
import {formatIDR} from '../../../shared/lib/format.js'


export default function CartPage() {
  const {items, totals, clearCart} = useCart()
  const MIN_ORDER_AMOUNT = 20000
  const isMinOrderReached = totals.subtotal >= MIN_ORDER_AMOUNT
  const remainingForMinOrder = MIN_ORDER_AMOUNT - totals.subtotal
  const formatMoney = (amount) => 
    formatIDR ? formatIDR(amount) : `Rp${amount?.toLocaleString('id-ID')}`
  return (
    <PageShell title="Keranjang Belanja">
      <div className="pb-36">
        {items.length > 0 && (
          <div className="flex justify-end mb-3">
            <button type="button" onClick={clearCart} className="text-xs font-semibold text-rose-500 hover:text-rose-600 active:scale-95 transition-transform">Kosongkan Keranjang
            </button>
          </div>
        )}
        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-800">Keranjang Kamu Masih Kosong</h2>
            <p className="mt-1 text-xs text-slate-500 max-w-xs">Yuk, pilih produk favoritmu sebelum kehabisan!</p>
            <Link to="/" className="mt-5 inline-block rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sky-600 active:scale-95 transition-all">Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Daftar Produk ({totals.totalItems})
              </h2>
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ringkasan Pembayaran
                </h2>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Produk</span>
                    <span className="font-semibold text-slate-800">{formatMoney(totals.subtotal)}</span>
                  </div>
                  <hr className="my-1 border-slate-100" />
                  <div className="flex justify-between text-sm font-bold text-slate-900">
                    <span>Total Tagihan</span>
                    <span className="text-sky-600">{formatMoney(totals.total)}</span>
                  </div>
                </div>
            </div> 
          </div>  
        )}
        {items.length > 0 && (
          <div className="fixed bottom-[57px] left-1/2 -translate-x-1/2 w-full max-w-[430px] z-20 border-t border-slate-200 bg-white p-3.5 shadow-md">
            <div className="flex flex-col gap-2">
              {!isMinOrderReached && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200/60">
                  <svg className="h-4 w-4 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Minimal belanja <strong>Rp20.000</strong>. Tambah lagi <strong>{formatMoney(remainingForMinOrder)}</strong>!
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] text-slate-400">Total Harga</span>
                  <span className="text-base font-black text-slate-900">{formatMoney(totals.total)}</span>
                </div>
                {isMinOrderReached ? (
                  <Link to="/checkout" className="flex-1 rounded-xl bg-sky-500 py-3 text-center text-xs font-bold text-white shadow-md transition-all hover:bg-sky-600 active:scale-95">
                    Lanjut ke Checkout
                  </Link>
                ) : (
                  <button type="button" disabled className="flex-1 rounded-xl bg-slate-200 py-3 text-center text-xs font-bold text-slate-400 cursor-not-allowed">
                    Lanjut ke Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  ) 
}
