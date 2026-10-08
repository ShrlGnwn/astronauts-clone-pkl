// TODO (PKL): implement create order dummy + simpan ke localStorage
const API_BASE_URL = 'http://localhost:8000/api'
const TOKEN_STORAGE_KEY = 'astronauts_clone_pkl:auth:token'
const ORDERS_STORAGE_KEY = 'astronauts_clone_pkl:orders'

export async function createOrder(orderPayLoad) {
  if (!orderPayLoad || !orderPayLoad.items || orderPayLoad.items.length === 0) {
    throw new Error('Keranjang belanja kosong')
  }
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!token) {
    throw new Error('Silahkan login terlebih dahulu untuk melakukan checkout')
  }
  const formattedPayload = {
   recipient_name: orderPayLoad.recipient?.name || orderPayLoad.name || '',
    phone_number: orderPayLoad.recipient?.phone || orderPayLoad.phone || '',
    address: orderPayLoad.address || '',
    payment_method: orderPayLoad.payment_method || orderPayLoad.paymentMethod || 'saldo',
    total_price: orderPayLoad.totalPrice || orderPayLoad.subtotal || 0,
    items: orderPayLoad.items.map((item) => ({
      id: item.id || item.product_id,                 
      product_id: item.product_id || item.id,         
      quantity: item.qty || item.quantity || 1,
      qty: item.qty || item.quantity || 1,
      price: item.price || 0,
    })),
  }
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formattedPayload),
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 422 && data.errors) {
        const firstError = Object.values(data.errors)[0]
        throw new Error(Array.isArray(firstError) ? firstError[0] : data.message)
      }
      throw new Error(data.message || 'Gagal membuat pesanan')
    }

    saveOrderToLocalStorage(data.data || data)

    return data
  } catch (error) {
    console.warn('API Error, menggunakan fallback simpan ke localStorage:', error.message)
    
    if (error.message.includes('required') || error.message.includes('wajib')) {
      throw error
    }

    const dummyOrder = {
      id: `ORD-${Date.now()}`,
      order_id: `ORD-${Date.now()}`,
      created_at: new Date().toISOString(),
      recipient_name: formattedPayload.recipient_name,
      phone_number: formattedPayload.phone_number,
      address: formattedPayload.address,
      payment_method: formattedPayload.payment_method,
      
      total_price: formattedPayload.total_price,
      total: formattedPayload.total_price,
      
      items: orderPayLoad.items.map((item) => ({
        id: item.id || item.product_id,
        product_id: item.product_id || item.id,
        name: item.name || item.product?.name || 'Produk',
        quantity: item.qty || item.quantity || 1,
        qty: item.qty || item.quantity || 1,
        price: item.price || 0,
      })),
      status: 'pending',
    }

    saveOrderToLocalStorage(dummyOrder)
    return { success: true, data: dummyOrder }
  }
}

function saveOrderToLocalStorage(orderData) {
  try {
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
    
    const exists = existingOrders.some((item) => item.id === orderData.id)
    if (!exists) {
      existingOrders.unshift(orderData)
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders))
    }
  } catch (err) {
    console.error('Gagal menyimpan pesanan ke localStorage:', err)
  }
}