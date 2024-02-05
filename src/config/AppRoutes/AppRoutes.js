// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, LoginPage, ProfilePage, RegisterPage } from '../../pages';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { isLoggedIn } from '../../utils/Common';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Unauthorize Routes */}
      <Route exact path="/" element={<Home />} />

      {/* Public Routes */}
      <Route element={<PublicRoute isAllowed={isLoggedIn} />}>
        <Route path='/account/login' element={
          <PublicRoute isAllowed={isLoggedIn} redirectTo='/account/profile'><LoginPage /></PublicRoute>
        } />
        <Route path='/account/register' element={
          <PublicRoute isAllowed={isLoggedIn} redirectTo='/account/register'><RegisterPage /></PublicRoute>
        } />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute isAllowed={!!isLoggedIn} />}>
        <Route path='/account/profile' element={
          <PrivateRoute isAllowed={!!isLoggedIn} redirectTo='/account/login'><ProfilePage /></PrivateRoute>
        } />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;