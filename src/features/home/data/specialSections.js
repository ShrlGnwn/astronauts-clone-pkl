// section "Special di Astro" di homepage.
// klik card masuk ke /promo/{promoSlug}, kayak astronauts.id/promo/harvest-picks-af

const img = (seed) => `https://picsum.photos/seed/${seed}/400/240`

export const specialSections = [
  {
    id: 'fresh-kebun',
    slug: 'fresh-kebun',
    title: 'Fresh dari Kebun',
    promoSlug: 'harvest-picks-af',
    href: '/promo/harvest-picks-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/8/CatTile810AugFresh1_fa47517a-3bc2-4a58-b39c-bfb1a1f76750_240x240.jpg'),
  },
  {
    id: 'waktunya-recharge',
    slug: 'waktunya-recharge',
    title: 'Waktunya Recharge',
    promoSlug: 'recharge-time-af',
    href: '/promo/recharge-time-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/8/cattile2_c4c9cafe-9a54-4fa6-a260-2611c053ac1d_240x240.jpg'),
  },
  {
    id: 'kombo-hemat',
    slug: 'kombo-hemat',
    title: 'Kombo Hemat',
    promoSlug: 'combo-deals-af',
    href: '/promo/combo-deals-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/8/CatTile11_837285fc-6504-4c0f-8efc-749274a3e226_240x240.jpg'),
  },
  {
    id: 'penyelamat-stok',
    slug: 'penyelamat-stok',
    title: 'Penyelamat Stok Rumah',
    promoSlug: 'pantry-saver-af',
    href: '/promo/pantry-saver-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/7/NewCATtilecopy80_218e14a0-7c90-44a9-8a78-e9ecbb469f80_240x240.jpg'),
  },
  {
    id: 'fillet-siap-olah',
    slug: 'fillet-siap-olah',
    title: 'Fillet Siap Olah',
    promoSlug: 'ready-fillet-af',
    href: '/promo/ready-fillet-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/8/CatTile810AugFrozen1_125a1d77-dc63-4d88-bb17-e9b6d1dc5080_240x240.jpg'),
  },
  {
    id: 'sehat-siap',
    slug: 'sehat-siap',
    title: 'Sehat & Siap',
    promoSlug: 'healthy-ready-af',
    href: '/promo/healthy-ready-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/8/CopyofCatTile11_cd4ee7db-66d4-406d-a693-4be3d21eccd6_240x240.jpg'),
  },
  {
    id: 'menu-praktis',
    slug: 'menu-praktis',
    title: 'Menu Praktis',
    promoSlug: 'practical-menu-af',
    href: '/promo/practical-menu-af',
    image: ('https://image.astronauts.cloud/homepage-catalog/2026/6/NewCATtile801_dacf73c6-1f61-4b60-8164-be1978707827_240x240.jpg'),
  },
]
