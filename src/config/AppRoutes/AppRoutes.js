// AppRoutes.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { isLoggedIn } from '../../utils/Common';
import { Home, LoginPage, LogoutPage, ProfilePage, RegisterPage } from '../../pages';

const AppRoutes = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    // Check login status and update state
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  console.log('Login:', isUserLoggedIn);
  console.log('Access Login (Public):', !isUserLoggedIn);
  console.log('Access Profile (Private):', isUserLoggedIn);

  return (
    <Router>
      <Routes>
        <Route exact element={<PrivateRoute />}>
          <Route exact path="/account/profile" element={<ProfilePage />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path='/account/login' element={<LoginPage />} />
        <Route path='/account/register' element={<RegisterPage />} />
        <Route path='/account/logout' element={<LogoutPage />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default AppRoutes;