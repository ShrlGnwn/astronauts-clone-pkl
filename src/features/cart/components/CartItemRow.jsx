// TODO (PKL): buat komponen CartItemRow
import React from 'react'
import {useCart} from '../CartContext.jsx'
import {formatIDR} from '../../../shared/lib/format.js'

export default function CartItemRow({item}) {
  const {updateQty, removeItem} = useCart()
  if (!item) return null
  const handleDecrement = () => {
    if (item.qty <= 1) {
      removeItem(item.id)
    } else {
      updateQty(item.id, item.qty -1)
    }
  }
  const handleIncrement = () => {
    updateQty(item.id, item.qty + 1)
  }
  const handleRemove = () => {
    removeItem(item.id)
  }
  const imageSrc = item.image || item.img || item.images || item.imageUrl || 'https://via.placeholder.com/100'

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3">
      <div className="flex items-center gap-3">
        <img src={imageSrc} alt={item.name} className="h-14 w-14 rounded-lg border border-slate-100 bg-slate-50 object-contain p-1" />
        <div className="flex flex-col">
          <span className="line-clamp-1 text-xs font-semibold text-slate-800">{item.name}</span>
          <span className="mt-0.5 text-xs font-bold text-slate-900">{formatIDR ? formatIDR(item.price) : `Rp${item.price?.toLocaleString('id-ID')}`}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
          <button onClick={handleDecrement} type="button" className="px-2.5 py-1 text-xs font-bold text-slate-600 transition hover:text-slate-900" aria-label="Kurangi kuantitas">-</button>
          <span className="w-6 select-none text-center text-xs font-semibold text-slate-800">{item.qty}</span>
          <button onClick={handleIncrement} type="button" className="px-2.5 py-1 text-xs font-bold text-slate-600 transition hover:text-slate-900" aria-label="Tambah kuantitas">+</button>
        </div>
        <button onClick={handleRemove} type="button" className="p-1 text-slate-400 transition hover:text-red-500" title="Hapus produk" aria-label="Hapus produk">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
