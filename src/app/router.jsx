import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'

import HomePage from '../features/home/pages/HomePage.jsx'
import PromoPage from '../features/home/pages/PromoPage.jsx'
import CollectionPage from '../features/catalog/pages/CollectionPage.jsx'
import ProductDetailPage from '../features/catalog/pages/ProductDetailPage.jsx'

import CartPage from '../features/cart/pages/CartPage.jsx'
import CheckoutPage from '../features/checkout/pages/CheckoutPage.jsx'

import LoginPage from '../features/auth/pages/LoginPage.jsx'
import AccountPage from '../features/auth/pages/AccountPage.jsx'
import OrdersPage from '../features/auth/pages/OrdersPage.jsx'
import RequireAuth from '../features/auth/components/RequireAuth.jsx'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'promo/:promoSlug', element: <PromoPage /> },
      { path: 'c/:collectionKey', element: <CollectionPage /> },
      { path: 'p/:slug', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'akun', element: <AccountPage /> },
          { path: '/pesanan', element: <OrdersPage /> },
        ],
      },
      { path: '*', element: <div className="p-6 text-left">404 - Halaman tidak ditemukan.</div> },
    ],
  },
])

