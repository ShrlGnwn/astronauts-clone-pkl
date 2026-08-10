import React, { useState, useEffect, useRef } from 'react'
import PageShell from '../../../shared/ui/PageShell.jsx'
import {banners} from '../data/banners.js'

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollLeft
    const width = e.target.offsetWidth
    if (width > 0) {
      const index = Math.round(scrollPosition / width) 
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if(!carouselRef.current) return
      const nextIndex = (activeIndex + 1) % banners.length
      const containerWidth = carouselRef.current.offsetWidth

      carouselRef.current.scrollTo({
        left: nextIndex * containerWidth,
        behavior: 'smooth'
      })
      setActiveIndex(nextIndex)
    }, 3000)
    return () => clearInterval(timer)
  }, [activeIndex])
  
  return (
    <PageShell title="">
      <div className="-mx-4 -mt-10 min-h-screen bg-slate-50">
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-20 px-4 pt-4 pb-2 text-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-800 drop-shadow-sm">Tiba dalam</span>
                <span className="text-xl font-black tracking-tight text-slate-900 drop-shadow-sm">15 Menit</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-all active:scale-95">
                  <svg className="h-7 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.285 8.344A2.75 2.75 0 0 0 2.25 11v3A2.75 2.75 0 0 0 5 16.75h2.5a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H5.815c.429-2.47 2.944-4.5 6.185-4.5s5.756 2.03 6.185 4.5H16.5a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h1.663A3.25 3.25 0 0 1 15 19.25h-1.145a2 2 0 1 0 0 1.5H15c2.4 0 4.384-1.78 4.705-4.091A2.75 2.75 0 0 0 21.75 14v-3a2.75 2.75 0 0 0-2.035-2.656C19.333 4.84 15.926 2.25 12 2.25S4.667 4.84 4.285 8.344" />
                  </svg>
                  <span>Chat CS</span>
                </button>
                <button type="button" aria-label="Menu Utama" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm transition-all active:scale-95">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-800 drop-shadow-sm">Buka 24 jam &amp; tersedia &gt;15.000 produk</p>
            <div className="mt-2.5">
              <div className="flex items-center gap-2 rounded-xl bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur-sm">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Cari produk disini" className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none" />
              </div>
            </div>
          </div>

          <div ref={carouselRef} onScroll={handleScroll} className="flex w-full snap-x snap-mandatory overflow-x-auto scrollbar-none">
            {banners.map((banner) => (
              <div key={banner.id} className="relative h-[333px] w-full flex-shrink-0 snap-center overflow-hidden">
                <a href={banner.href} className="block h-full w-full">
                  <img src={banner.image} alt={banner.title} className="absolute inset-0 block h-full w-full max-w-full text-transparent object-cover object-bottom" />
                </a>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-1.5">
            {banners.map((_, index) => (
              <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} onClick={() => {
                if (!carouselRef.current) return
                const containerWidth = carouselRef.current.offsetWidth
                carouselRef.current.scrollTo({
                  left: index * containerWidth,
                  behavior: 'smooth'
                })
                setActiveIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                ? 'w-5 bg-sky-500'
                : 'w-2 bg-white/50'
                }`} 
                />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}