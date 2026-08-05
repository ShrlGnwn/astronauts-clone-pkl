// grid kategori di homepage.
// url-nya niru astro: /c/astro-goods-2564. collectionKey & href digenerate di bawah.
// categorySlug cuma buat nyambungin ke categories.js, boleh kosong.

const img = (seed) => `https://picsum.photos/seed/${seed}/200/200`

function collection(slug, collectionId, rest) {
  const collectionKey = `${slug}-${collectionId}`
  return {
    slug,
    collectionId,
    collectionKey,
    href: `/c/${collectionKey}`,
    ...rest,
  }
}

export const homeCategories = [
  collection('astro-goods', '2564', {
    id: 'hc1',
    name: 'Astro Goods',
    categorySlug: null,
    image: img('hc-astro-goods'),
    initiallyVisible: true,
  }),
  collection('produk-terbaru', '1024', {
    id: 'hc2',
    name: 'Produk Terbaru',
    categorySlug: null,
    image: img('hc-terbaru'),
    initiallyVisible: true,
  }),
  collection('astro-basics', '2048', {
    id: 'hc3',
    name: 'Astro Basics',
    categorySlug: null,
    image: img('hc-basics'),
    initiallyVisible: true,
  }),
  collection('astro-bakery', '3072', {
    id: 'hc4',
    name: 'Astro Bakery',
    categorySlug: null,
    image: img('hc-bakery'),
    initiallyVisible: true,
  }),
  collection('buah-segar', '3012', {
    id: 'hc5',
    name: 'Buah Segar',
    categorySlug: 'buah-segar',
    image: img('hc-buah'),
    initiallyVisible: true,
  }),
  collection('ayam-unggas', '4016', {
    id: 'hc6',
    name: 'Ayam & Unggas',
    categorySlug: 'daging-ayam-seafood',
    image: img('hc-ayam'),
    initiallyVisible: true,
  }),
  collection('sayur-segar', '3013', {
    id: 'hc7',
    name: 'Sayur Segar',
    categorySlug: 'sayur-segar',
    image: img('hc-sayur'),
    initiallyVisible: true,
  }),
  collection('daging-beku', '5018', {
    id: 'hc8',
    name: 'Daging Beku',
    categorySlug: 'makanan-beku',
    image: img('hc-daging-beku'),
    initiallyVisible: true,
  }),
  collection('telur-tahu-tempe', '3020', {
    id: 'hc9',
    name: 'Telur, Tahu & Tempe',
    categorySlug: 'telur-tahu-tempe',
    image: img('hc-telur'),
    initiallyVisible: false,
  }),
  collection('susu-olahan', '3021', {
    id: 'hc10',
    name: 'Susu & Olahan Susu',
    categorySlug: 'susu-olahan',
    image: img('hc-susu'),
    initiallyVisible: false,
  }),
  collection('seafood', '4017', {
    id: 'hc11',
    name: 'Seafood',
    categorySlug: 'daging-ayam-seafood',
    image: img('hc-seafood'),
    initiallyVisible: false,
  }),
  collection('snack', '6010', {
    id: 'hc12',
    name: 'Snack',
    categorySlug: 'snack',
    image: img('hc-snack'),
    initiallyVisible: false,
  }),
  collection('makanan-beku', '5019', {
    id: 'hc13',
    name: 'Makanan Beku',
    categorySlug: 'makanan-beku',
    image: img('hc-frozen'),
    initiallyVisible: false,
  }),
  collection('biskuit', '6011', {
    id: 'hc14',
    name: 'Biskuit',
    categorySlug: 'snack',
    image: img('hc-biskuit'),
    initiallyVisible: false,
  }),
  collection('bahan-masak-bumbu', '3022', {
    id: 'hc15',
    name: 'Bahan Masak & Bumbu',
    categorySlug: 'bahan-masak-bumbu',
    image: img('hc-bumbu'),
    initiallyVisible: false,
  }),
]
