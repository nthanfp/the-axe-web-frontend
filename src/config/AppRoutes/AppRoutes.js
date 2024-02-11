// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ChangePassword, Error404, Home, LoginPage, LogoutPage, ProfilePage, RegisterPage, UpdateProfile } from '../../pages';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact element={<PrivateRoute />}>
          <Route path="/account" element={<ProfilePage />} />
          <Route path='/account/logout' element={<LogoutPage />} />
          <Route path='/account/change-password' element={<ChangePassword />} />
          <Route path="/account/update-profile" element={<UpdateProfile />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path='/account/login' element={<LoginPage />} />
        <Route path='/account/register' element={<RegisterPage />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;