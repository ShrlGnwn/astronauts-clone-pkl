import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import ProductCard from '../../catalog/components/ProductCard.jsx'
import {promoProducts} from '../data/promoProducts.js'

export default function PromoPage() {
  const { promoSlug } = useParams()
  const [productList, setProductList] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const data = promoProducts.getByPromoSlug(promoSlug)
      setProductList(data)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [promoSlug])
  const formatTitle = (str) => {
    if (!str) return 'promo'
    return str
    .replace(/-af$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <PageShell title={`Promo: ${formatTitle(promoSlug)}`}>
      <div className="py-4">
        <div className="mb-6 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 p-4 text-white shadow-xs">
          <h2 className="text-lg font-bold">🔥Promo Spesial Hari Ini</h2>
          <p className="mt-0.5 text-xs opacity-90">Dapatkan harga hemat khusus untuk kategori promo {formatTitle(promoSlug)}</p>
        </div>
        <p className="mb-4 text-xs text-slate-500">Menampilkan {productList.length} product promo</p>
        {loading ? (
          <div className="flex gap-3 overflow-x-auto px-4 pb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 w-40 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center">
            <p className="text-sm font-semibold text-slate-700">Promo tidak ditemukan</p>
            <p className="mt-1 text-xs text-slate-400">Belum ada produk promo untuk "{promoSlug}"</p>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto px-4 pb-6 scrollbar-none">
            {productList.map((product) => (
              <div key={product.id} className="w-36 flex-shrink-0 sm:w-44">
              <ProductCard  product={product} />
              </div>
            ))}
          </div>
        )
        }
      </div>
    </PageShell>
  )
}
