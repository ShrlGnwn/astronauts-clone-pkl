import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {homeCategories} from '../data/homeCategories.js'

export default function HomeCategories() {
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
          <span className="text-xs font-bold leading-snug text-slate-800">{isExpanded ? 'sembunyikan' : `Cek Kategori Lainnya (${remainingCount})`}</span>
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