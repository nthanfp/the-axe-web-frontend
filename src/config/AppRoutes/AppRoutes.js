// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ChangePassword, Error404, Home, LoginPage, LogoutPage, ProfilePage, RegisterPage, StarterPage1, UpdateProfile } from '../../pages';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route exact element={<PrivateRoute />}>
          <Route path='/admin/manage-user' element={<StarterPage1 />} />
        </Route>

        {/* Private routes */}
        <Route exact element={<PrivateRoute />}>
          <Route path="/account" element={<ProfilePage />} />
          <Route path='/account/logout' element={<LogoutPage />} />
          <Route path='/account/change-password' element={<ChangePassword />} />
          <Route path="/account/update-profile" element={<UpdateProfile />} />
        </Route>

        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route path='/account/login' element={<LoginPage />} />
        <Route path='/account/register' element={<RegisterPage />} />

        {/* Error routes */}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;