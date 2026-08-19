import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../../home/components/SearchBar.jsx'
import { collectionProduct } from '../data/collectionProducts.js'

export default function CollectionPage() {
  const { collectionKey } = useParams()
  const [productList, setProductList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const data = collectionProduct.getByCollectionKey(collectionKey)
      setProductList(data || [])
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

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageShell title={formatTitle(collectionKey)}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="py-4">
        <p className="mb-4 text-xs text-slate-500">
          Menampilkan {filteredProducts.length} produk
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-slate-200"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Produk tidak ditemukan</p>
            <p className="mt-1 text-xs text-slate-400">
              {searchQuery
                ? `Tidak ada produk yang cocok dengan kata kunci "${searchQuery}"`
                : `Tidak ada produk dalam koleksi "${collectionKey}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}