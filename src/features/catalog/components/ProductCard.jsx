import React from 'react'
import {Link} from 'react-router-dom'
import {useCart} from '../../cart/CartContext.jsx'

export default function ProductCard({product, onAddToCart}) {
  if (!product) return null
  const {addItem} = useCart()
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency' ,
      currency:'IDR' ,
      maximumFractionDigits: 0,
    }).format(number)
  }
  const handleAddClick = (e) => {
    e.preventDefault()
    addItem(product)
    if (onAddToCart) {
      onAddToCart(product)
    }
  }
  const isOutOfStock = product.stock === 0
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-xs transition-all hover:shadow-md">
      <Link to={`/p/${product.slug}`} className="flex flex-col gap-1.5">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
          <img src={product.images?.[0]} alt={product.name} className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isOutOfStock ? 'opacity-40' : ''
          }`}
          loading="lazy" />
          {isOutOfStock && (
            <span className="absolute inset-0 m-auto flex h-fit w-fit rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">Habis</span>
          )}
        </div>
        <span className="text-[10px] font-medium text-slate-400">{product.unit}</span>
        <h3 className="line-clamp-2 min-h-[2.25rem] text-xs font-semibold text-slate-800 leading-snug">{product.name}</h3>
      </Link>
      <div className="mt-2 flex items-end justify-between gap-1">
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
          )}
          <span className="text-xs font-bold text-slate-900">{formatRupiah(product.price)}</span>
        </div>
        <button type="button" disabled={isOutOfStock} onClick={handleAddClick} className={`flex h-7 w-7 items-center justify-center rounded-lg border font-bold transition-all active:scale-95 ${
          isOutOfStock
          ? 'border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed'
          : 'border-indigo-600 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
        }`}
        aria-label="Tambah produk">
          +
        </button>
      </div>
    </div>
  )
}