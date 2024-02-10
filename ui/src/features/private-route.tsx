import { Navigate, Outlet } from 'react-router-dom'
import usePinStore from '../stores/pin-store'

const PrivateRoute = () => {
  const isLoggedIn = usePinStore((state) => state.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
