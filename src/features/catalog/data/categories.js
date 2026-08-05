// kategori produk. nama & urutannya ambil dari astronauts.id

const categoryIcon = (seed) => `https://picsum.photos/seed/${seed}/200/200`

export const categories = [
  {
    slug: 'buah-segar',
    name: 'Buah Segar',
    description: 'Buah pilihan yang dipetik dan dikirim hari ini.',
    icon: categoryIcon('cat-buah'),
  },
  {
    slug: 'sayur-segar',
    name: 'Sayur Segar',
    description: 'Sayuran harian untuk masakan rumah.',
    icon: categoryIcon('cat-sayur'),
  },
  {
    slug: 'daging-ayam-seafood',
    name: 'Daging, Ayam & Seafood',
    description: 'Protein segar dan beku siap olah.',
    icon: categoryIcon('cat-protein'),
  },
  {
    slug: 'telur-tahu-tempe',
    name: 'Telur, Tahu & Tempe',
    description: 'Lauk sederhana yang selalu ada di dapur.',
    icon: categoryIcon('cat-telur'),
  },
  {
    slug: 'susu-olahan',
    name: 'Susu & Olahan Susu',
    description: 'Susu, keju, dan yoghurt untuk stok kulkas.',
    icon: categoryIcon('cat-susu'),
  },
  {
    slug: 'kebutuhan-pokok',
    name: 'Kebutuhan Pokok',
    description: 'Beras, minyak, gula, dan bahan wajib lainnya.',
    icon: categoryIcon('cat-pokok'),
  },
  {
    slug: 'bahan-masak-bumbu',
    name: 'Bahan Masak & Bumbu',
    description: 'Bumbu dapur dan rempah untuk masak sehari-hari.',
    icon: categoryIcon('cat-bumbu'),
  },
  {
    slug: 'makanan-beku',
    name: 'Makanan Beku',
    description: 'Frozen food praktis untuk stok darurat.',
    icon: categoryIcon('cat-frozen'),
  },
  {
    slug: 'snack',
    name: 'Snack',
    description: 'Camilan, biskuit, dan cokelat teman santai.',
    icon: categoryIcon('cat-snack'),
  },
  {
    slug: 'minuman',
    name: 'Minuman',
    description: 'Air mineral, teh, kopi, sampai minuman dingin.',
    icon: categoryIcon('cat-minuman'),
  },
  {
    slug: 'perawatan-diri',
    name: 'Perawatan Diri',
    description: 'Sabun, shampoo, dan kebersihan badan.',
    icon: categoryIcon('cat-perawatan'),
  },
  {
    slug: 'perawatan-rumah',
    name: 'Perawatan Rumah',
    description: 'Kebutuhan bersih-bersih rumah dan cuci baju.',
    icon: categoryIcon('cat-rumah'),
  },
]
