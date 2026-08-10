import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import PageShell from '../../../shared/ui/PageShell.jsx'
import { menuGroups } from '../../../app/data/menu.js'
import { specialSections } from '../data/specialSections.js'
import {banners} from '../data/banners.js'
import { faqs } from '../data/faqs.js'
import { homeCategories } from '../data/homeCategories.js'
import { footerNavLinks,appDownloadLinks, socialLinks } from '../data/footerLinks.js'

function SpecialSection() {
  return (
    <section className="px-4 py-4">
      <h2 className="mb-3 text-base font-bold text-slate-900">Spesial di Astro</h2>
      <div className="grid grid-cols-4 gap-3">
        {specialSections.map((item) => (
          <Link key={item.id} to={item.href} className="group relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm transition-all hover:shadow-md active:scale-95">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  )
}

function  FaqAccordion() {
  const [openId, setOpenId] = useState(null)
  const toggleFaq = (id) => {
    setOpenId(openId === id? null: id)
  }
  return (
    <section className="px-1 py-4">
      <div className="bg-white">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div key={faq.id} className="border-b border-slate-200">
              <button type="button" onClick={() => toggleFaq(faq.id)} className="flex w-full items-center justify-between py-4 text-left focus:outline-none">
                <span className="text-sm font-semibold">{faq.question}</span>
                <svg className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.069 5.157L8.384 9.768a.546.546 0 0 1-.768 0L2.93 5.158a.55.55 0 0 0-.771 0a.53.53 0 0 0 0 .759l4.684 4.61a1.65 1.65 0 0 0 2.312 0l4.684-4.61a.53.53 0 0 0 0-.76a.55.55 0 0 0-.771 0" />
                </svg>
              </button>
              {isOpen && (
                <div className="pb-4 text-xs leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function HomeCategories() {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleCategories = homeCategories.filter((item) => item.initiallyVisible)
  const remainingCount = homeCategories.length - visibleCategories.length
  const displayedCategories = isExpanded ? homeCategories : visibleCategories

  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-3 text-lg font-bold text-slate-900">Semua Kategori</h2>
      <div className="grid grid-cols-4 gap-2.5">
        {displayedCategories.map((item) => (
          <Link key={item.id} to={item.href} className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-2xl bg-slate-100 p-2 shadow-sm transition-transform active:scale-95">
            <span className="z-10 text-center text-[11px] font-bold leading-tight text-slate-800 line-clamp-2">{item.name}</span>
            <div className="relative h-2/3 w-full">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-bottom" loading="lazy" />
            </div>
          </Link>
        ))}
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="flex aspect-[3/4] w-full flex-col items-center justify-between rounded-2xl bg-blue-50/80 p-2.5 text-center">
          <span className="text-xs font-bold leading-snug text-slate-800">{isExpanded ? 'sembuyikan' : `Cek Kategori Lainnya (${remainingCount})`}</span>
          <div className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
            <svg className={`h-4 w-4 text-blue-600 transition-transform duration-200 flex items-center justify-center ${ isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m7 10l5 5m0 0l5-5" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  )
}

function HomeFooter() {
  const mainHeader = footerNavLinks[0]?.label || 'Cari semua di astro'
  const navItems = footerNavLinks.slice(1)

  return (
    <footer className="bg-white px-4 py-6 text-slate-800">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-2 text-base font-bold text-slate-900">{mainHeader}</h3>
          <div className="flex flex-wrap items-center text-xs text-slate-500 leading-relaxed">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.disabled ? (
                  <span className="text-slate-400 cursor-not-allowed">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.href} className="hover:text-slate-900 transition-colors">
                    {item.label}
                  </Link>
                )}
                {index < navItems.length - 1 && (
              <span className="mx-1.5 text-slate-300">|</span>
              )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2.5 text-base font-bold text-slate-900">Gunakan Aplikasi Astro</h3>
          <div className="flex items-center gap-2">
            {appDownloadLinks.map((app, index) => (
              <a key={index} href={app.label.includes('App Store') ? 'https://apps.apple.com' : 'https://play.google.com'} target="_blank" rel="noreferrer" className="inline-block transition-opacity hover:opacity-80">
                <img src={app.href} alt={app.label} className="h-8 w-auto" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2.5 text-base font-bold text-slate-900">Social Media</h3>
          <div className="flex items-center gap-2.5">
            <a href="https://www.instagram.com/astronauts.id" target="_blank" rel="noreferrer" className="transition-transform active:scale-95">
              <img src="https://www.astronauts.id/mobile-web-assets/img/instagram.svg" alt="Instagram" className="h-7 w-7" />
            </a>
            <a href="https://www.facebook.com/astronauts.id" target="_blank" rel="noreferrer" className="transition-transform active:scale-95">
              <img src="https://www.astronauts.id/mobile-web-assets/img/facebook.svg" alt="Facebook" className="h-7 w-7" />
            </a>
            <a href="https://www.youtube.com/channel/UCdnBvEWKvBuBTlQ-NssCQsQ" target="_blank" rel="norefferer" className="transition-transform active:scale-95">
              <img src="https://www.astronauts.id/mobile-web-assets/img/youtube.svg" alt="Youtube" className="h-7 w-7" />
            </a>
            <a href="https://www.linkedin.com/company/astronautsid" target="_blank" rel="noreferrer" className="transition-transform active:scale-95">
              <img src="https://www.astronauts.id/mobile-web-assets/img/linkedin.svg" alt="LinkedIn" className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function MainMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  if (!isOpen) return null
  return  createPortal(
    <div className="fixed inset-0 z-[99999] flex justify-center bg-black/40 backdrop-blur-md transition-all">
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">Menu Utama</h2>
        <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 active:scale-95">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-3">
        {menuGroups.map((group) => (
          <div key={group.id} className="py-2">
            <nav className="flex flex-col gap-1">
              {group.items.map((item, index) => (
                <div key={index}>
                  {item.disabled ? (
                    <span className="block py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 cursor-not-allowed">{item.label}</span>
                  ) : (
                    <Link to={item.href} onClick={onClose} className="block py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 transition-colors hover:text-indigo-600">{item.label}</Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>

      </div>
    </div>,
    document.body
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                <div className="flex items-center justify-end p-4">
                <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Menu Utama" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 p-1 text-slate-800 shadow-sm backdrop-blur-sm transition-all active:scale-95">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                </div>
                <MainMenu isOpen={isMenuOpen} onClose={() =>  setIsMenuOpen(false)} />
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
        <SpecialSection />
        <HomeCategories />
        <FaqAccordion />
        <HomeFooter />
      </div>
    </PageShell>
  )
}