import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute({ isAllowed, redirectTo = '/account/profile', children }) {
  if (isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}
