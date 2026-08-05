import { createContext, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // TODO (PKL): implement login/logout + persist localStorage
  const value = {
    user: null,
    isAuthenticated: false,
    orders: [],
    login: () => ({ ok: false, error: 'Belum diimplementasi.' }),
    logout: () => {},
    refreshOrders: () => {},
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai dalam AuthProvider')
  return ctx
}
