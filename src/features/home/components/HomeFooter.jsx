import React from 'react'
import {Link} from 'react-router-dom'
import { footerNavLinks, appDownloadLinks, socialLinks } from '../data/footerLinks'

export default function HomeFooter() {
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
              <a key={index} href={app.href} target="_blank" rel="noreferrer" className="inline-block transition-opacity hover:opacity-80">
                <img src={app.image || app.badge} alt={app.label || app.name} className="h-8 w-auto" />
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
            <a href="https://www.youtube.com/channel/UCdnBvEWKvBuBTlQ-NssCQsQ" target="_blank" rel="noreferrer" className="transition-transform active:scale-95">
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