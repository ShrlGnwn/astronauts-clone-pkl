// TODO (PKL): implement create order dummy + simpan ke localStorage
export async function createOrder(orderPayLoad) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (!orderPayLoad || !orderPayLoad.items || orderPayLoad.items.length === 0) {
    throw new Error('Keranjang belanja kosong')
  }
  const newOrder = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: orderPayLoad.items,
    address: orderPayLoad.address,
    paymentMethod: orderPayLoad.paymentMethod,
    subtotal: orderPayLoad.subtotal,
    shippingFee: orderPayLoad.shippingFee,
    totalPrice: orderPayLoad.totalPrice,
    estimatedArrival: '15 Menit',
    status: 'Diproses'
  }
  const existingOrders = JSON.parse(localStorage.getItem('astronauts_clone_pkl:orders') || '[]')
  const updatedOrders = [newOrder, ...existingOrders]
  localStorage.setItem('astronauts_clone_pkl:orders', JSON.stringify(updatedOrders))

  return newOrder
}
