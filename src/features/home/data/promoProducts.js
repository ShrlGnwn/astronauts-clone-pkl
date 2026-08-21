import {products} from '../../catalog/data/products.js'

export const promoProductMap = {
  'harvest-picks-af': ['p3', 'p4', 'p5', 'p6'],
  'recharge-time-af': ['p29', 'p30', 'p31'],
  'combo-deals-af': ['p23', 'p24', 'p25'],
  'pantry-saver-af': ['p16', 'p17', 'p18'],
  'ready-fillet-af': ['p7', 'p8', 'p9'],
  'healthy-ready-af': ['p32', 'p33', 'p34'],
  'practical-menu-af': ['p23', 'p11', 'p12'],
}

export const promoProducts = {
  getByPromoSlug: (promoSlug) => {
    if (!promoSlug) return []
    const productIds = promoProductMap[promoSlug] || []
    if (productIds.length > 0) {
      return products.filter((p) => productIds.includes(p.id))
    }

    return products.filter((p) => p.originalPrice && p.originalPrice > p.price)
  },
}