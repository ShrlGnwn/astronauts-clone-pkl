import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])
  return(
    <PageShell title="Daftar Pesanan">
      <div className="mx-auto my-6 max-w-2xl">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">📦</div>
            <h3 className="text-base font-bold text-slate-800">Belum ada pesanan</h3>
            <p className="mt-1 text-xs text-slate-400">Kamu belum pernah melakukan transaksi. Yuk, mulai belanja</p>
            <Link to="/" className="mt-5 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sky-600 transition">Mulai Belanja</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={order.id || index} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-xs font-bold text-slate-700">ID Pesanan: #{order.id || `ORD-${index + 1}`}</p>
                    <p className="text-[10px] text-slate-400">{order.date || 'Hari ini'}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 border border-emerald-100">{order.status || 'Selesai'}</span>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs text-slate-600">
                        <span>
                          {item.name} <strong className="text-slate-400">X{item.quantity || 1}</strong>
                        </span>
                        <span>Rp {(item.price * (item.quantity || 1)).toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="text-xs text-slate-500">Total Pembayaran</span>
                  <span>
                    Rp {order.total ? order.total.toLocaleString('id-ID') : '0'}
                  </span>
                </div>
              </div> 
            ))}
          </div>
        )}
      </div>
    </PageShell>
  ) 
}
