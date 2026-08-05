# PLAN (Roadmap PKL) - Astronauts Clone

Ini daftar tugas untuk kamu, peserta PKL. Kerjakan urut dari Fase 1 ke bawah.
Centang (`[x]`) setiap kali satu poin selesai, supaya pembimbing bisa memantau progres.

Referensi: <https://www.astronauts.id/> (brand: **ASTRO**)

---

## Pembagian feature (penting)

| Feature | Isi | Contoh file |
|---|---|---|
| `home/` | Halaman utama + konten homepage | `pages/HomePage.jsx`, `data/banners.js`, `components/HeroCarousel.jsx` |
| `catalog/` | Katalog produk (browsing & detail) | `pages/CategoryPage.jsx`, `data/products.js`, `components/ProductCard.jsx` |
| `app/` | Navigasi global (bukan halaman) | `data/menu.js`, `data/bottomNav.js`, `layouts/AppLayout.jsx` |

HomePage **tidak** masuk `catalog/` — meskipun homepage menampilkan produk/kategori, halaman & komponen layout-nya milik feature `home/`. Feature `catalog/` cuma supply data produk & komponen seperti `ProductCard`.

---

## Sebelum mulai: kenali dulu ASTRO itu apa

ASTRO = belanja kebutuhan harian **sampai dalam 15 menit**, buka **24 jam**.
Bukan marketplace, bukan toko fashion.

| Hal | Nilai |
|---|---|
| Estimasi kirim | 15 menit |
| Jam operasional | 24 jam |
| Area layanan | Jabodetabek |
| Minimum belanja | Rp20.000 (belum termasuk ongkir) |
| Pembayaran | E-wallet, VA, Saldo Astro. **Tidak ada COD** |
| Loyalty | Astro Coin (1 coin = Rp5) |

---

## Blueprint HomePage (WAJIB jadi acuan)

Urutan section dari **atas ke bawah**. Baca baik-baik sebelum ngoding.

### 1. Header (overlay di atas carousel)
- Badge/info: **"Tiba dalam 15 menit"**, **"Buka 24 jam"**, dll
- Bar alamat pengiriman
- Tombol **chat CS**
- Ikon **hamburger** (buka full-page menu)
- Ikon **keranjang** (dengan badge jumlah item)

> **Penting:** Header ini **bukan** terpisah dari carousel. Carousel di section 2 jadi **background header** — header overlay/transparan di atas gambar carousel.

### 2. Carousel promo (top page)
- Banner berganti-ganti (auto-slide/swipe)
- Gambar carousel = background visual area header
- Data: `src/features/home/data/banners.js`

### 3. Search bar
- Di bawah info "buka 24 jam" / area header
- Placeholder: **"Cari di Astro..."**
- Fungsi search bisa dummy dulu (Fase 5)

### 4. Section "Special di Astro"
- Grid card/gambar kurasi promo
- Klik → `/promo/{promoSlug}` (contoh: `/promo/harvest-picks-af`)
- Data: `src/features/home/data/specialSections.js`

### 5. Section "Semua Kategori"
- Grid card/gambar kategori navigasi
- Klik → `/c/{slug}-{id}` (contoh: `/c/astro-goods-2564`)
- Tombol **"Cek kategori lainnya"** → expand kategori tambahan
- Data: `src/features/home/data/homeCategories.js`

### 6. Section Q&A (accordion)
- Pertanyaan diklik → jawaban muncul
- Satu jawaban terbuka pada satu waktu (disarankan)
- Data: `src/features/home/data/faqs.js`

### 7. Footer konten (scrollable, bukan sticky)
- Link navigasi: "Cari Semua di Astro!", Astro Goods, Jaminan Segar, Karir, dll
- Data: `src/features/home/data/footerLinks.js` → `footerNavLinks`

### 8. Download app
- Tombol/badge App Store & Google Play
- Data: `footerLinks.js` → `appDownloadLinks`

### 9. Social media
- Link Instagram, Facebook, YouTube, LinkedIn
- Data: `footerLinks.js` → `socialLinks`

### Sticky bottom navigation (global — di AppLayout)
**Selalu tampil di bawah layar** (`fixed bottom-0`), di semua halaman.

| Tab | Ikon | Route |
|---|---|---|
| Home | rumah | `/` |
| Keranjang | cart | `/cart` |
| Transaksi | receipt | `/akun/pesanan` |
| Profil | user | `/akun` |

Sudah disiapkan: `src/app/components/BottomNav.jsx` + data `src/app/data/bottomNav.js`.
PKL tinggal polish styling & badge jumlah item di ikon Keranjang.

> Bottom nav ≠ footer konten homepage (section 7–9). Bottom nav = navigasi app. Footer homepage = konten informatif scrollable.

### Header homepage (HANYA di HomePage — bukan global)
Header ASTRO (15 menit, 24 jam, alamat, chat CS, hamburger, keranjang) + carousel overlay
**hanya ada di HomePage**, implementasi di `src/features/home/components/`.

### Hamburger menu (full page)
- Buka dari ikon hamburger di header
- Menutupi **seluruh layar** (`fixed inset-0`), bukan dropdown kecil
- Tombol X untuk tutup
- Data: `src/app/data/menu.js`

---

## Sudah disiapkan pembimbing — jangan diubah

- [x] Project Vite + React + Tailwind
- [x] Routing & layout minimal
- [x] Halaman kosong per route
- [x] Struktur folder feature-based
- [x] Data produk — `src/features/catalog/data/products.js` (37 produk)
- [x] Data kategori produk — `src/features/catalog/data/categories.js` (12 kategori)
- [x] Data homepage — `src/features/home/data/` (banner, special, homeCategories, faq, footer)
- [x] Data navigasi — `src/app/data/` (menu hamburger, bottom nav)
- [x] Data user login — `src/features/auth/data/users.js`
- [x] Stub `catalogApi.js`, `checkoutApi.js`
- [x] Skeleton `CartContext`, `AuthContext`, `RequireAuth`
- [x] **BottomNav** sticky global — `src/app/components/BottomNav.jsx`

**Kalau butuh field/data baru, bilang pembimbing dulu — jangan edit sendiri.**

Field penting `products.js`:

| Field | Arti |
|---|---|
| `slug` | Key di URL → `/p/:slug` |
| `price` | Harga sekarang |
| `originalPrice` | Harga coret (`null` = tidak diskon) |
| `unit` | Satuan jual (mis. `500 g`) |
| `stock` | `0` = habis, tidak bisa dibeli |
| `isPopular` | Untuk section "Paling Laris" |

List produk per halaman:
- `/c/:collectionKey` → `catalog/data/collectionProducts.js`
- `/promo/:promoSlug` → `home/data/promoProducts.js`

Klik produk → `/p/{slug}` (contoh: `/p/jeruk-nipis-organik`)

---

## Fase 1 — Layout & HomePage

- [ ] **HomeHeader** di `src/features/home/components/`: overlay di atas carousel (15 menit, 24 jam, alamat, chat CS, hamburger, keranjang) — **hanya HomePage**
- [ ] **HeroCarousel**: baca `banners.js`, jadi background visual header
- [ ] **SearchBar** di bawah area header
- [ ] **SpecialSections** grid — baca `specialSections.js`
- [ ] **HomeCategories** grid + tombol expand "Cek kategori lainnya" — baca `homeCategories.js`
- [ ] **FaqAccordion** — baca `faqs.js`
- [ ] **HomeFooter** (link + download app + social) — baca `footerLinks.js`
- [ ] **MainMenu** full-page dari hamburger — baca `menu.js`
- [ ] Polish **BottomNav** (styling mirip ASTRO + badge jumlah item di Keranjang)
- [ ] Komponen homepage taruh di `src/features/home/components/` (HeroCarousel, SpecialSections, dll)
- [ ] `ProductCard` + implement `catalogApi.js` (di feature `catalog/`)
- [ ] **CollectionPage** (`/c/:collectionKey`) — list produk dari `collectionProducts.js`, klik → `/p/{slug}`
- [ ] **PromoPage** (`/promo/:promoSlug`) — list produk dari `promoProducts.js`, klik → `/p/{slug}`
- [ ] **ProductDetailPage** (`/p/:slug`) — tampilkan detail produk

## Fase 2 — Keranjang
- [ ] `CartContext` + persist `localStorage`
- [ ] `CartItemRow` dengan stepper `- qty +`
- [ ] **CartPage** + minimum order Rp20.000
- [ ] Badge jumlah item di ikon Keranjang (bottom nav)

## Fase 3 — Login & Akun
- [ ] `AuthContext` + `RequireAuth`
- [ ] **LoginPage**, **AccountPage**

## Fase 4 — Checkout & Pesanan
- [ ] `checkoutApi.js` + **CheckoutPage** (estimasi ±15 menit)
- [ ] **OrdersPage** (tab Transaksi di bottom nav)

## Fase 5 — Polish (opsional)
- [ ] Search produk dari search bar
- [ ] Empty states, loading skeleton, validasi form
- [ ] Badge diskon, stok habis, Astro Coin

---

## Aturan desain: Mobile-first

- Rancang untuk HP. Desktop tetap max-width ~430px, centered.
- Jangan pakai `md:`, `lg:`, `xl:` untuk layout utama.
- Grid produk: `grid-cols-2`. Grid kategori/special: sesuaikan (biasanya 2–4 kolom).
- Warna aksen: ungu/violet gelap (konsisten).
- Format harga: pakai `formatIDR()` dari `src/shared/lib/format.js`.

## Kredensial demo
- Email: `demo@demo.com` / Password: `password`

## LocalStorage keys
Prefix: `astronauts_clone_pkl:` → `cart`, `auth:user`, `orders`
