import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {useAuth} from '../AuthContext.jsx'

export default function RequireAuth() {
  const {isAuthenticated} = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
  // TODO (PKL): redirect ke /login jika belum authenticated
  return <Navigate to ="/login" state={{from: location}} replace />
  }
  return <Outlet />
}
