import { createContext, useContext, useState, useEffect } from 'react'
import { demoUsers } from '../../features/auth/data/users.js'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'astronauts_clone_pkl:auth:user'

export function AuthProvider({ children }) {
  // TODO (PKL): implement login/logout + persist localStorage

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [orders, setOrders] = useState([])
  useEffect(() =>{
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = (email, password) => {
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      const userData = {
       ...foundUser,
       saldo: 25000,
       astroCoin: 1500
      }
      setUser(userData)
      return {ok:true}
    }
    return {ok:false,error: 'Email atau password salah'}
  }

  const logout = () => {
    setUser(null)
    setOrders([])
  }
  const refreshOrders = () => {
    //masih kosong unutk saat ini
  }

  const value = {
    user,
    isAuthenticated: !!user,
    orders,
    login,
    logout,
    refreshOrders,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai dalam AuthProvider')
  return ctx
}
