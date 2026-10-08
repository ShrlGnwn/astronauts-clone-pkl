import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'astronauts_clone_pkl:auth:user'
const TOKEN_STORAGE_KEY = 'astronauts_clone_pkl:auth:token'
const API_BASE_URL = 'http://localhost:8000/api'

export function AuthProvider({ children }) {
  // TODO (PKL): implement login/logout + persist localStorage

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || null
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
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
      refreshOrders()
    } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setOrders([])
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
      const data = await response.json()
      if (response.ok) {
        const extractedUser = data.user || data.data?.user || data.data
        const extractedToken = data.token || data.access_token || data.data?.token
        if (!extractedUser || !extractedToken) {
          return {
            ok: false,
            error: 'Format response server tidak sesuai (user/token hilang)'
        }
      }
      setUser(extractedUser)
      setToken(extractedToken)
      refreshOrders(extractedToken)
      return {ok: true}
    } else {
      return {
        ok: false,
        error: data.message || 'Email atau password salah'
      }
    }
    } catch (error) {
      console.error('Login request failed:', error)
      return {ok: false, error: 'Gagal terhubung ke server backend'}
    }
  }
  
  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        })
      } catch (err) {
       console.error('Logout error:', err)
       }
    }
    setUser(null)
    setToken(null)
    setOrders([])
  }
  const refreshOrders = async () => {
    const currentToken = token || localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!currentToken) return
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Accept': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        setOrders(Array.isArray(data) ? data : (data.data || []))
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
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
    token,
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
