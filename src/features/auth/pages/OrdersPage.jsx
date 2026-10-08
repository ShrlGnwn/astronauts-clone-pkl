import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('astronauts_clone_pkl:auth:token')

        // Panggil API Laravel Backend untuk mengambil data pesanan real-time
        const response = await fetch('http://localhost:8000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })

        const result = await response.json()

        if (response.ok && result.data) {
          setOrders(result.data)
          // Sync data API terbaru ke localStorage untuk offline fallback
          localStorage.setItem('astronauts_clone_pkl:orders', JSON.stringify(result.data))
        } else {
          throw new Error(result.message || 'Gagal mengambil data dari API')
        }
      } catch (err) {
        console.error('Fetch API gagal, menggunakan data offline dari LocalStorage:', err)
        // Fallback jika API error atau offline
        const savedOrders = localStorage.getItem('astronauts_clone_pkl:orders')
        if (savedOrders) {
          try {
            setOrders(JSON.parse(savedOrders))
          } catch (parseErr) {
            console.error('Gagal parsing data orders:', parseErr)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Fungsi helper styling warna badge berdasarkan status pesanan
  const getBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'dikirim':
        return 'border-amber-200 bg-amber-50 text-amber-700'
      case 'diproses':
        return 'border-sky-200 bg-sky-50 text-sky-700'
      case 'selesai':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
      case 'dibatalkan':
        return 'border-rose-200 bg-rose-50 text-rose-700'
      case 'pending':
      default:
        return 'border-slate-200 bg-slate-50 text-slate-600'
    }
  }

  return (
    <PageShell title="Daftar Pesanan">
      <div className="mx-auto my-6 max-w-2xl">
        {loading ? (
          <div className="py-10 text-center text-xs font-semibold text-slate-400">
            Memuat daftar pesanan...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📦
            </div>
            <h3 className="text-base font-bold text-slate-800">Belum ada pesanan</h3>
            <p className="mt-1 text-xs text-slate-400">
              Kamu belum pernah melakukan transaksi. Yuk, mulai belanja
            </p>
            <Link
              to="/"
              className="mt-5 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-sky-600"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const totalAmount = order.total_price || order.totalPrice || order.total || 0

              const dateRaw = order.created_at || order.createdAt
              const formattedDate = dateRaw
                ? new Date(dateRaw).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                : '-'

              const itemsList = order.orderItems || order.order_items || order.items || []

              return (
                <div
                  key={order.id || index}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        ID Pesanan: #{order.id}
                      </p>
                      <p className="text-[10px] text-slate-400">{formattedDate}</p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold capitalize ${getBadgeStyle(
                        order.status
                      )}`}
                    >
                      {order.status || 'pending'}
                    </span>
                  </div>

                  {itemsList.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {itemsList.map((item, i) => {
                        const itemName = item.product?.name || item.name || 'Produk'
                        const itemQty = item.qty || item.quantity || 1
                        const itemPrice = item.price || item.product?.price || 0

                        return (
                          <div key={i} className="flex justify-between text-xs text-slate-600">
                            <span>
                              {itemName}{' '}
                              <strong className="text-slate-400">X{itemQty}</strong>
                            </span>
                            <span>
                              Rp {(itemPrice * itemQty).toLocaleString('id-ID')}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-50 pt-2 font-semibold">
                    <span className="text-xs text-slate-500">Total Pembayaran</span>
                    <span className="text-sm text-slate-800">
                      Rp {Number(totalAmount).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageShell>
  )
}