import { createContext, useContext, useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'astronauts_clone_pkl:cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // TODO (PKL): implement cart state + persist localStorage
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Gagal membaca cart dari localStorage:', error)
      return []
    }
  }) 
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Gagal menyimpan cart ke localStorage:', error)
    }
  }, [items])
  const addItem = (product, qty = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        }
        return updated
      }
      return [...prevItems, {...product, qty }]
    })
  }
  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeItem(productId)
      return
    }
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === productId ? {...item, qty} : item
      )
    )
  }
  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }
  const clearCart = () => {
    setItems([])
  }
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.qty,
    0
  )
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const value = {
    items,
    totals: {
      subtotal, totalItems, shipping: 0, total:subtotal,
    },
    addItem, updateQty, removeItem, clearCart,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai dalam CartProvider')
  return ctx
}
