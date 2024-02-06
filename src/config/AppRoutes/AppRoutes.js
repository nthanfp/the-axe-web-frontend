// AppRoutes.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { isLoggedIn } from '../../utils/Common';
import { ChangePassword, Home, LoginPage, LogoutPage, ProfilePage, RegisterPage, UpdateProfile } from '../../pages';

const AppRoutes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

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
        <Route />
      </Routes>
    </Router>
  );
};

export default AppRoutes;