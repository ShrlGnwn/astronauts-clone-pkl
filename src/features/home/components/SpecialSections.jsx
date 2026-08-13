import React from 'react'
import {Link} from 'react-router-dom'
import {specialSections} from '../data/specialSections.js'

export default function SpecialSections() {
  return (
    <section className="px-4 py-4">
      <h2 className="mb-3 text-base font-bold text-slate-900">Spesial di Astro</h2>
      <div className="grid grid-cols-4 gap-3">
        {specialSections.map((item) => (
          <Link key={item.id} to={item.href} className="group relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm transition-all hover:shadow-md active:scale-95">
              <img src={item.image} alt={item.title || 'Special Section'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          </Link>
        ))}
      </div>
    </section>
  )
}