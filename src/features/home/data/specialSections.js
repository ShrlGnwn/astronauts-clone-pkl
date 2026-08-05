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
    image: img('special-fresh-kebun'),
  },
  {
    id: 'waktunya-recharge',
    slug: 'waktunya-recharge',
    title: 'Waktunya Recharge',
    promoSlug: 'recharge-time-af',
    href: '/promo/recharge-time-af',
    image: img('special-recharge'),
  },
  {
    id: 'kombo-hemat',
    slug: 'kombo-hemat',
    title: 'Kombo Hemat',
    promoSlug: 'combo-deals-af',
    href: '/promo/combo-deals-af',
    image: img('special-kombo'),
  },
  {
    id: 'penyelamat-stok',
    slug: 'penyelamat-stok',
    title: 'Penyelamat Stok Rumah',
    promoSlug: 'pantry-saver-af',
    href: '/promo/pantry-saver-af',
    image: img('special-stok-rumah'),
  },
  {
    id: 'fillet-siap-olah',
    slug: 'fillet-siap-olah',
    title: 'Fillet Siap Olah',
    promoSlug: 'ready-fillet-af',
    href: '/promo/ready-fillet-af',
    image: img('special-fillet'),
  },
  {
    id: 'sehat-siap',
    slug: 'sehat-siap',
    title: 'Sehat & Siap',
    promoSlug: 'healthy-ready-af',
    href: '/promo/healthy-ready-af',
    image: img('special-sehat'),
  },
  {
    id: 'menu-praktis',
    slug: 'menu-praktis',
    title: 'Menu Praktis',
    promoSlug: 'practical-menu-af',
    href: '/promo/practical-menu-af',
    image: img('special-menu-praktis'),
  },
]
