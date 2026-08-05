import { Outlet } from 'react-router-dom'

export default function RequireAuth() {
  // TODO (PKL): redirect ke /login jika belum authenticated
  return <Outlet />
}
