import { createContext, useContext, useState, useEffect } from 'react'
import { demoUsers } from '../../features/auth/data/users.js'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'astronauts_clone_pkl:auth:user'
const ORDERS_STORAGE_KEY ='astronauts_clone_pkl:orders'

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

  useEffect(() => {
    refreshOrders()
  }, [])

  const login = (email, password) => {
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      const userData = {
        ...foundUser,
        saldo: 250000,
        astroCoin: 1500
      }
      setUser(userData)
      refreshOrders()
      return {ok:true}
    }
    return {ok:false,error: 'Email atau password salah'}
  }

  const logout = () => {
    setUser(null)
    setOrders([])
  }
  const refreshOrders = () => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error('Failed to parse orders:', error)
      }
    } else {
      setOrders([])
    }
  }
  const addAstroCoin = (amount) => {
    if (!user) return
    setUser((prevUser) => ({
      ...prevUser,
      astroCoin: (prevUser?.astroCoin || 0) + amount,
    }))
  }

  const value = {
    user,
    isAuthenticated: !!user,
    orders,
    login,
    logout,
    refreshOrders,
    addAstroCoin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai dalam AuthProvider')
  return ctx
}
