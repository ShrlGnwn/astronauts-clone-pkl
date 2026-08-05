import { createContext, useContext } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // TODO (PKL): implement cart state + persist localStorage
  const value = {
    items: [],
    totals: { subtotal: 0, shipping: 0, total: 0 },
    addItem: () => {},
    updateQty: () => {},
    removeItem: () => {},
    clearCart: () => {},
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai dalam CartProvider')
  return ctx
}
