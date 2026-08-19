import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import ProductCard from '../components/ProductCard.jsx'
import {collectionProduct} from '../data/collectionProducts.js'

export default function CollectionPage() {
  const { collectionKey } = useParams()
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const data = collectionProduct.getByCollectionKey(collectionKey)
      setProductList(data)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [collectionKey])
  const formatTitle = (str) => {
    if (!str) return 'Koleksi Produk'
    return str
    .replace(/-\d+$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
   <PageShell title={formatTitle(collectionKey)}>
    <div className="py-4">
      <p className="mb-4 text-xs text-slate-500">Menampilkan {productList.length} produk</p>
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-slate-200"></div>
          ))}
        </div>
      ) : productList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center border border-slate-100">
          <p className="text-sm font-semibold text-slate-700">Produk tidak ditemukan</p>
          <p className="mt-1 text-xs text-slate-400">Tidak ada produk dalam koleksi "{collectionKey}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )
      }
    </div>
   </PageShell>
  ) 
}
