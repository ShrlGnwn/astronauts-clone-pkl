// isi menu hamburger.
// yang disabled halamannya emang belum ada, tetep ditampilin tapi bikin abu-abu.

export const menuGroups = [
  {
    id: 'belanja',
    title: 'Belanja',
    items: [
      { label: 'Home', href: '/', disabled: false },
      { label: 'Semua Kategori', href: '/c/all', disabled: false },
      { label: 'Keranjang', href: '/cart', disabled: false },
    ],
  },
  {
    id: 'akun',
    title: 'Akun Saya',
    items: [
      { label: 'Profil', href: '/akun', disabled: false },
      { label: 'Pesanan Saya', href: '/pesanan', disabled: false },
      { label: 'Saldo & Astro Coin', href: '/akun', disabled: false },
    ],
  },
  {
    id: 'tentang',
    title: 'Tentang Astro',
    items: [
      { label: 'Astro Goods', href: '#', disabled: true },
      { label: 'Jaminan Segar', href: '#', disabled: true },
      { label: 'Area Layanan', href: '#', disabled: true },
      { label: 'Komunitas', href: '#', disabled: true },
      { label: 'Blog', href: '#', disabled: true },
      { label: 'FAQ', href: '#', disabled: true },
    ],
  },
]
