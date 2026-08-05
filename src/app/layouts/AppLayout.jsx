import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 pb-[var(--bottom-nav-height)]">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
