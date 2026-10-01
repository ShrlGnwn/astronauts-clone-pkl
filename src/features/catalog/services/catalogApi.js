// TODO (PKL): implement mock async API untuk katalog
const API_BASE_URL = 'http://localhost:8000/api'
const TOKEN_STORAGE_KEY = 'astronauts_clone_pkl:auth:token'

const getHeaders = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token ? {'Authorization': `Bearer ${token}`} : {}),
  }
}
const handleResponse = async (res, defaultFallback = []) => {
  if (!res.ok) return defaultFallback
  const json = await res.json()
  if (Array.isArray(json)) return json
  if (Array.isArray(json.data)) return json.data
  return json.data || json || defaultFallback
}

export const catalogApi = {
  getProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, { headers: getHeaders() })
      return await handleResponse(res, [])
    } catch (error) {
      console.error('getProducts error:', error)
      return []
    }
  },

  getProductsBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${slug}`, { headers: getHeaders() })
      return await handleResponse(res, null)
    } catch (error) {
      console.error('getProductsBySlug error:', error)
      return null
    }
  },

  getProductsByPromoSlug: async (promoSlug) => {
    try {
      const res = await fetch(`${API_BASE_URL}/promos/${promoSlug}`, { headers: getHeaders() })
      return await handleResponse(res, [])
    } catch (error) {
      console.error('getProductsByPromoSlug error:', error)
      return []
    }
  },

  getProductsByCategory: async (categorySlug) => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${categorySlug}/products`, { headers: getHeaders() })
      return await handleResponse(res, [])
    } catch (error) {
      console.error('getProductsByCategory error:', error)
      return []
    }
  },

  getPopularProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/popular`, { headers: getHeaders() })
      return await handleResponse(res, [])
    } catch (error) {
      console.error('getPopularProducts error:', error)
      return []
    }
  },

  getProductsByCollectionKey: async (collectionKey) => {
    try {
      const res = await fetch(`${API_BASE_URL}/collections/${collectionKey}`, { headers: getHeaders() })
      return await handleResponse(res, [])
    } catch (error) {
      console.error('getProductsByCollectionKey error:', error)
      return []
    }
  },
}

export const getProductsByCollectionKey = async (collectionKey) => {
  return catalogApi.getProductsByCollectionKey(collectionKey)
}
