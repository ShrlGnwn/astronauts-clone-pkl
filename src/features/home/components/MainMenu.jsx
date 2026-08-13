import React, {useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Link} from 'react-router-dom'
import { menuGroups } from '../../../app/data/menu.js'

export default function MainMenu({ isOpen, onClose }) {
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