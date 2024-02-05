import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute({ isAllowed, redirectTo = "/account/login", children }) {
 if (!isAllowed) {
  return <Navigate to={redirectTo} />
 }
 return children ? children : <Outlet />
}