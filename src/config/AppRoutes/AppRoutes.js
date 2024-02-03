import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, LoginPage, ProfilePage, RegisterPage } from '../../pages';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  { path: '/', element: <Home />, exact: true },
  { path: '/account/login', element: <LoginPage /> },
  { path: '/account/register', element: <RegisterPage /> },
  { path: '/account/profile', element: <ProtectedRoute element={<ProfilePage />} /> },
];

const AppRoutes = () => (
  <Router>
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRoutes;
