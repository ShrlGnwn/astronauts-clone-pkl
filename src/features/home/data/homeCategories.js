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
    image: ('https://image.astronauts.cloud/homepage-category/2025/12/KVCatTileInfiniteProductScrollCATTILE1_7fdea47e-84cd-40e2-b1c8-4f554ed691ed_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('produk-terbaru', '1024', {
    id: 'hc2',
    name: 'Produk Terbaru',
    categorySlug: null,
    image: ('https://image.astronauts.cloud/homepage-category/2025/12/catnewarrival2_69f4e3d8-4c7e-44e6-9e00-2888bf9e957c_719x919.jpg'),
    initiallyVisible: true,
  }),
  collection('astro-basics', '2048', {
    id: 'hc3',
    name: 'Astro Basics',
    categorySlug: null,
    image: ('https://image.astronauts.cloud/homepage-category/2026/8/AstroBasics_591a5ce0-ad2a-49ee-811a-1e8efbfe0d42_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('astro-bakery', '3072', {
    id: 'hc4',
    name: 'Astro Bakery',
    categorySlug: null,
    image: ('https://image.astronauts.cloud/homepage-category/2026/6/ChatGPTImageJun182026112117AM_365642fa-43a0-4f50-894a-fef66e6094a6_239x306.png'),
    initiallyVisible: true,
  }),
  collection('buah-segar', '3012', {
    id: 'hc5',
    name: 'Buah Segar',
    categorySlug: 'buah-segar',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/BuahSegar_8ec4a5a7-9341-4656-ac62-7d32e492cb23_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('ayam-unggas', '4016', {
    id: 'hc6',
    name: 'Ayam & Unggas',
    categorySlug: 'daging-ayam-seafood',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/AyamUnggas_e4a03533-b5d8-4e45-bdba-d05ff94708b9_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('sayur-segar', '3013', {
    id: 'hc7',
    name: 'Sayur Segar',
    categorySlug: 'sayur-segar',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/SayurSegar_06e3bec8-dd04-4ea3-9678-eb53b4a6404f_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('daging-beku', '5018', {
    id: 'hc8',
    name: 'Daging Beku',
    categorySlug: 'makanan-beku',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/DagingBeku_6be9aba9-7289-4863-9b69-a7682a184514_239x306.jpg'),
    initiallyVisible: true,
  }),
  collection('telur-tahu-tempe', '3020', {
    id: 'hc9',
    name: 'Telur, Tahu & Tempe',
    categorySlug: 'telur-tahu-tempe',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/TahuTempe_3b0ae4a0-0d58-4fd7-9944-74b0285a7d3d_239x306.jpg'),
    initiallyVisible: false,
  }),
  collection('susu-olahan', '3021', {
    id: 'hc10',
    name: 'Susu & Olahan Susu',
    categorySlug: 'susu-olahan',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/SusuOlahan_55078e44-b2ce-46c6-919b-08d0d86b220d_239x306.jpg'),
    initiallyVisible: false,
  }),
  collection('seafood', '4017', {
    id: 'hc11',
    name: 'Seafood',
    categorySlug: 'daging-ayam-seafood',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/Seafood_d873aff1-c62f-460d-a5ae-6056b849ca64_239x306.jpg'),
    initiallyVisible: false,
  }),
  collection('snack', '6010', {
    id: 'hc12',
    name: 'Snack',
    categorySlug: 'snack',
    image: ('https://image.astronauts.cloud/homepage-category/2026/7/Snack_40b48815-abc0-43e2-a219-616d58608ede_239x306.png'),
    initiallyVisible: false,
  }),
  collection('makanan-beku', '5019', {
    id: 'hc13',
    name: 'Makanan Beku',
    categorySlug: 'makanan-beku',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/MakananBeku_195cbac3-b588-4345-a088-2f67b423d953_239x306.jpg'),
    initiallyVisible: false,
  }),
  collection('biskuit', '6011', {
    id: 'hc14',
    name: 'Biskuit',
    categorySlug: 'snack',
    image: ('https://image.astronauts.cloud/homepage-category/2025/7/Biskuit_0519e38f-0e4a-4d27-98f2-e7c553588431_239x306.jpg'),
    initiallyVisible: false,
  }),
  collection('bahan-masak-bumbu', '3022', {
    id: 'hc15',
    name: 'Bahan Masak & Bumbu',
    categorySlug: 'bahan-masak-bumbu',
    image: ('https://image.astronauts.cloud/homepage-category/2026/2/BahanMasak_ad65d4b6-3a04-4475-afa1-3552c4c36587_239x306.png'),
    initiallyVisible: false,
  }),
]
