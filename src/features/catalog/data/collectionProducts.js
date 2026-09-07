// produk apa aja yang tampil di tiap halaman kategori. isinya id dari products.js

import { products } from "./products"

export const collectionProductMap = {
  'astro-goods-2564': ['p1', 'p6', 'p10', 'p16'],
  'produk-terbaru-1024': ['p3', 'p7', 'p13', 'p23'],
  'astro-basics-2048': ['p16', 'p17', 'p18', 'p19'],
  'astro-bakery-3072': ['p26', 'p27', 'p28'],
  'buah-segar-3012': ['p1', 'p2', 'p3'],
  'ayam-unggas-4016': ['p7', 'p8'],
  'sayur-segar-3013': ['p4', 'p5', 'p6'],
  'daging-beku-5018': ['p23', 'p24', 'p25'],
  'telur-tahu-tempe-3020': ['p10', 'p11', 'p12'],
  'susu-olahan-3021': ['p13', 'p14', 'p15'],
  'seafood-4017': ['p9'],
  'snack-6010': ['p26', 'p27', 'p28'],
  'makanan-beku-5019': ['p23', 'p24', 'p25'],
  'biskuit-6011': ['p27', 'p28'],
  'bahan-masak-bumbu-3022': ['p19', 'p20', 'p21', 'p22'],
}

export const collectionProduct = {
  getByCollectionKey: (key) => {
    if(!key) return []
    if (key=== 'all') return products
    const productIds = collectionProductMap[key] || []
    if (productIds.length > 0) {
      return products.filter((p) => productIds.includes(p.id))
    }
    return products.filter((p) => p.categorySlug === key)
  },
}
