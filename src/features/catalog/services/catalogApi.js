// TODO (PKL): implement mock async API untuk katalog
import { products } from '../data/products.js'
import { collectionProductMap } from '../data/collectionProducts.js'

export const catalogApi = {
  getProducts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return products
  },

getProductsBySlug: async (slug) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const product = products.find((p) => p.slug === slug)
  if (!product) throw new Error('Produk tidak ditemukan')
  return product
  },

getProductsByCategory: async (categorySlug) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((p) => p.categorySlug === categorySlug)
  },

getPopularProducts: async () => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((p) => p.isPopular)
  },
getProductsByCollectionKey: async (collectionKey) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const productIds = collectionProductMap[collectionKey] || []
  return products.filter((p) => productIds.includes(p.id))
  },
}
export const getProductsByCollectionKey = async (collectionKey) => {
  return catalogApi.getProductsByCollectionKey(collectionKey)
}
