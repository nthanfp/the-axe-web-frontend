// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ChangePassword, Error404, Home, ListProject, ListTools, LoginPage, LogoutPage, ManageProject, ManageTool, ManageUser, ProfilePage, RegisterPage, StarterPage1, UpdateProfile } from '../../pages';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route exact element={<PrivateRoute />}>
          <Route path='/admin/dashboard' element={<StarterPage1 />} />
          <Route path='/admin/manage-users' element={<ManageUser />} />
          <Route path='/admin/manage-tools' element={<ManageTool />} />
          <Route path='/admin/manage-projects' element={<ManageProject />} />
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
        <Route exact path="/tools" element={<ListTools />} />
        <Route exact path="/projects" element={<ListProject />} />

        {/* Authentication */}
        <Route path='/account/login' element={<LoginPage />} />
        <Route path='/account/register' element={<RegisterPage />} />

        {/* Error routes */}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;