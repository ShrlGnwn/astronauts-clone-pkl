import { NavLink } from 'react-router-dom'
import { bottomNavItems } from '../data/bottomNav.js'

function NavIcon({ name }) {
  const className = 'h-5 w-5'

  switch (name) {
    case 'home':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
        </svg>
      )
    case 'cart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
          <path d="M2 3h2l1.5 11h13L21 6H6" />
        </svg>
      )
    case 'receipt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2h12v20l-2-1-2 1-2-1-2 1-2-1-2 1V2Z" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      )
    case 'user':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      )
    default:
      return null
  }
}

export default function BottomNav() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-200 bg-white"
    >
      <ul className="grid grid-cols-4">
        {bottomNavItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-1 py-2 text-xs',
                  isActive ? 'text-purple-700 font-medium' : 'text-gray-500',
                ].join(' ')
              }
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
