import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import { catalogApi } from '../services/catalogApi.js'
export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    catalogApi.getProductsBySlug(slug)
    .then((data) => setProduct(data))
    .catch((err) => {
      console.error(err)
      setProduct(null)
    })
    .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <PageShell title="Memuat Produk...">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-semibold text-slate-500">Memuat detail produk</p>
        </div>
      </PageShell>
    )
  }

  if (!product) {
    return (
      <PageShell title="Produk Tidak Ditemukan">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-semibold text-slate-700">Produk yang kamu cari tidak ditemukan</p>
          <button onClick={() => navigate('/')} className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">Kembali ke Beranda
          </button>
        </div>
      </PageShell>
    )
  }
  const handleDecrement = () => {
    if (qty > 1) setQty(qty - 1)
  }
  const handleIncrement = () => {
    setQty(qty + 1)
  }
  const handleAddToCart = () => {
    alert(`Berhasil menambahkan ${qty}x ${product.name} ke keranjang!`)
  }

  return (
    <PageShell title={product.name}>
      <div className="mx-auto max-w-4xl py-6">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xs">
            <img src={product.image || product.img || product.images || product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="h-56 w-full object-contain" />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              {product.unit && (
                <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{product.unit}</span>
              )}
              <h1 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">{product.name}</h1>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">Rp{product.price?.toLocaleString('id-ID')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">Rp{product.originalPrice?.toLocaleString('id-ID')}</span>
                )}
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Produk</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {product.description || 'Tidak ada deskripsi untuk produk ini'}
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                  <button onClick={handleDecrement} disabled={qty <= 1} className="px-3 py-1.5 text-base font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30">
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-slate-800">{qty}</span>
                  <button onClick={handleIncrement} className="px-3 py-1.5 text-base font-bold text-slate-600 hover:text-slate-900">
                    +
                  </button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-emerald-700 active:scale-[0.98]">
                  + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
