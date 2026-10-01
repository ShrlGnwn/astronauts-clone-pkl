import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../../home/components/SearchBar.jsx'
import { catalogApi } from '../services/catalogApi.js'

export default function CollectionPage() {
  const { collectionKey } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)

  const cleanKey = collectionKey ? collectionKey.replace(/-\d+$/, '') : ''

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchQuery(q)
  }, [searchParams])

  const handleSearchChange = (val) => {
    setSearchQuery(val)
    if (val) {
      setSearchParams({ q: val }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const fetchCollection = async () => {
      try {
        // 1. Coba fetch ke Backend dengan cleanKey (misal 'astro-goods')
        let data = await catalogApi.getProductsByCollectionKey(cleanKey)

        if (!data || data.length === 0) {
          data = await catalogApi.getProductsByCategory(cleanKey)
        }

        if (!data || data.length === 0) {
          data = await catalogApi.getProducts()
        }

        if (isMounted) {
          setProductList(data || [])
          setLoading(false)
        }
      } catch (err) {
        console.error('Gagal memuat produk koleksi:', err)
        if (isMounted) {
          // Jika API error, fallback ambil semua produk
          const fallbackData = await catalogApi.getProducts().catch(() => [])
          setProductList(fallbackData)
          setLoading(false)
        }
      }
    }

    fetchCollection()

    return () => {
      isMounted = false
    }
  }, [collectionKey, cleanKey])

  const formatTitle = (str) => {
    if (!str) return 'Koleksi Produk'
    return str
      .replace(/-\d+$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const filteredProducts = productList.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageShell title={formatTitle(collectionKey)}>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <div className="py-4">
        <p className="mb-4 text-xs text-slate-500">
          Menampilkan {filteredProducts.length} produk
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}