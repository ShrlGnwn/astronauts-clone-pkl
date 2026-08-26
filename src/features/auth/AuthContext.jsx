import { createContext, useContext, useState, useEffect } from 'react'
import { demoUsers } from '../../features/auth/data/users.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // TODO (PKL): implement login/logout + persist localStorage

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [orders, setOrders] = useState([])
  useEffect(() =>{
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  const login = (email, password) => {
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
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
