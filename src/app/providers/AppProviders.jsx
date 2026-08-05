import { CartProvider } from '../../features/cart/CartContext.jsx'
import { AuthProvider } from '../../features/auth/AuthContext.jsx'

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      <AuthProvider>{children}</AuthProvider>
    </CartProvider>
  )
}

