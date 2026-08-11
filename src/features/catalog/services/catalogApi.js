// TODO (PKL): implement mock async API untuk katalog
import { products } from '../data/products.js'

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
  return product.filter((p) => p.categorySlug === categorySlug)
  },

getPopularProducts: async () => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((p) => p.isPopular)
  },
}
