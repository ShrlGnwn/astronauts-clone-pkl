import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function SearchBar({value, onChange}) {
    const [internalQuery, setInternalQuery] = useState('')
    const navigate = useNavigate()
    const query = value !== undefined ? value : internalQuery

    const handleChange = (newVal) => {
        if (onChange) {
            onChange(newVal)
        } else {
            setInternalQuery(newVal)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        navigate(`/c/all?q=${encodeURIComponent(query)}`)
    }
    return (
         <form onSubmit={handleSubmit} className="mt-2.5">
            <div className="flex items-center gap-2 rounded-xl bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur-sm">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" value={query || ''} onChange={(e) => handleChange(e.target.value)} placeholder="Cari produk disini" className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none" />
                {query && (
                    <button 
                        type="button"
                        onClick={() => handleChange('')}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-600">
                            Clear
                    </button>
                )}
            </div>
        </form>
    )
}