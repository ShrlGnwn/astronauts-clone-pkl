# Astronauts Clone PKL (Frontend-Only)

Scaffolding **skeleton** untuk clone [astronauts.id](https://www.astronauts.id/) (ASTRO).
Halaman masih kosong — tugas PKL mengisi UI & logic.

## Stack
Vite + React (JS) + Tailwind + React Router

## Jalankan
```bash
cd astronauts-clone-pkl
npm install
npm run dev
```

## Mobile-first (wajib)
UI dirancang untuk HP. Di desktop tetap tampil seperti mobile (max-width ~430px, centered).
Jangan buat layout melebar penuh layar.

## Header placeholder
**Tidak ada header global.** Header ASTRO (carousel overlay, hamburger, chat CS, dll) **hanya ada di HomePage** — tugas PKL implementasi di `src/features/home/`.

Navigasi global = **sticky bottom nav** (`src/app/components/BottomNav.jsx`), sudah disiapkan.

## Struktur folder
```
src/
├── app/
│   ├── data/           # menu hamburger, bottom nav
│   ├── components/     # BottomNav
│   ├── layouts/        # AppLayout (tanpa header global)
│   └── router.jsx
├── features/
│   ├── home/           # HomePage + data & komponen khusus homepage
│   ├── catalog/        # kategori, detail produk, ProductCard, catalogApi
│   ├── cart/
│   ├── checkout/
│   └── auth/
└── shared/ui/ & shared/lib/
```

## Dummy data

| File | Isi |
|---|---|
| `catalog/data/products.js` | 37 produk (key = `slug`) |
| `catalog/data/collectionProducts.js` | Mapping produk per halaman `/c/:collectionKey` |
| `home/data/promoProducts.js` | Mapping produk per halaman `/promo/:promoSlug` |
| `catalog/data/categories.js` | 12 kategori produk |
| `home/data/banners.js` | Carousel promo (background header) |
| `home/data/specialSections.js` | Section "Special di Astro" |
| `home/data/homeCategories.js` | Section "Semua Kategori" (+ expand) |
| `home/data/faqs.js` | Accordion Q&A |
| `home/data/footerLinks.js` | Footer link, download app, social |
| `app/data/menu.js` | Menu hamburger full-page |
| `app/data/bottomNav.js` | Sticky bottom nav (Home, Keranjang, Transaksi, Profil) |
| `app/components/BottomNav.jsx` | Komponen bottom nav (sudah wired di layout) |
| `auth/data/users.js` | Login demo: `demo@demo.com` / `password` |

## Route map
| Route | Halaman |
|---|---|
| `/` | Home |
| `/promo/:promoSlug` | Promo (dari Special di Astro) |
| `/c/:collectionKey` | Koleksi (mis. `astro-goods-2564`) |
| `/p/:slug` | Detail Produk (mis. `/p/jeruk-nipis-organik`) |
| `/cart` | Keranjang |
| `/checkout` | Checkout |
| `/login` | Login |
| `/akun` | Profil (protected) |
| `/akun/pesanan` | Transaksi (protected) |

Detail struktur HomePage & checklist tugas: **`PLAN.md`**
