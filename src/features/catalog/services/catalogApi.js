// TODO (PKL): implement mock async API untuk katalog
import { products } from '../data/products.js'
import { promoProducts } from '../../home/data/promoProducts.js'

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

getProductsByPromoSlug: async (promoSlug) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return promoProducts.getByPromoSlug(promoSlug)
},

getProductsByCategory: async (categorySlug) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((p) => p.categorySlug === categorySlug)
  },

getPopularProducts: async () => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((p) => p.isPopular)
  },
}
