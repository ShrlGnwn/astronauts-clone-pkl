import React, {useState} from 'react'
import MainMenu from './MainMenu.jsx'
import SearchBar from './SearchBar.jsx'

export default function HomeHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className="absolute inset-0 top-0 z-20 px-4 pb-2 text-slate-900">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800 drop-shadow-sm">Tiba dalam</span>
                    <span className="text-xl font-black tracking-tight text-slate-900 drop-shadow-sm">15 Menit</span>
                </div>
                <div className="flex items-center gap-2">
                    <button type="button" className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-all active:scale-95">
                        <svg className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.285 8.344A2.75 2.75 0 0 0 2.25 11v3A2.75 2.75 0 0 0 5 16.75h2.5a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H5.815c.429-2.47 2.944-4.5 6.185-4.5s5.756 2.03 6.185 4.5H16.5a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h1.663A3.25 3.25 0 0 1 15 19.25h-1.145a2 2 0 1 0 0 1.5H15c2.4 0 4.384-1.78 4.705-4.091A2.75 2.75 0 0 0 21.75 14v-3a2.75 2.75 0 0 0-2.035-2.656C19.333 4.84 15.926 2.25 12 2.25S4.667 4.84 4.285 8.344" />
                        </svg>
                        <span>Chat CS</span>
                    </button>
                    <button type="button" onClick={() => setIsMenuOpen(true)}
                        aria-label="Menu Utama" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 p-1 text-slate-800 shadow-sm backdrop-blur-sm transition-all active:scale-95"> 
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </div>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-800 drop-shadow-sm">Buka 24 jam &amp; tersedia &gt;15.000 produk</p>
            <SearchBar />
        </div>
    )
}