import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import ProductCard from '../../catalog/components/ProductCard.jsx'
import { catalogApi } from '../../catalog/services/catalogApi.js'
import { promoProducts } from '../data/promoProducts.js'
export default function PromoPage() {
  const { promoSlug } = useParams()
  const [products, setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const cleanSlug = promoSlug ? promoSlug.replace(/-af$/, '') : ''
  const displayTitle = cleanSlug
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')
  useEffect(() => {
    const fetchPromoData = async () => {
      setLoading(true)
      try {
        let data = await catalogApi.getProductsByPromoSlug(cleanSlug)

        if (!data || !Array.isArray(data) || data.length === 0) {
          data = promoProducts.getByPromoSlug(cleanSlug)
        }

        setProducts(data || [])
      } catch (error) {
        console.error('Gagal memuat produk promo:', error)
        const localFallback = promoProducts.getByPromoSlug(cleanSlug)
        setProducts(localFallback)
      } finally {
        setLoading(false)
      }
    }

    fetchPromoData()
  }, [promoSlug, cleanSlug])

  return (
    <PageShell title={`Promo: ${displayTitle}`}>
      <div className="mx-auto my-6 max-w-2xl px-4">
        {/* Banner Promo Header */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-red-500 to-amber-500 p-6 text-white shadow-md">
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            🔥 Promo Spesial Hari Ini
          </h1>
          <p className="mt-1 text-xs text-red-50">
            Dapatkan harga hemat khusus untuk kategori promo {displayTitle}
          </p>
        </div>

        <p className="mb-4 text-xs text-slate-500">
          Menampilkan {products.length} product promo
        </p>

        {/* Content Section */}
        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">
            Memuat produk promo...
          </div>
        ) : products.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="my-8 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h3 className="text-sm font-bold text-slate-700">Promo tidak ditemukan</h3>
            <p className="mt-1 text-xs text-slate-400">
              Belum ada produk promo untuk "{promoSlug}"
            </p>
          </div>
        )}
      </div>
    </PageShell>
  )
}
