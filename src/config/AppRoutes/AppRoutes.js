// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { ChangePassword, Contact, DashboardAdmin, Error404, Home, ListProject, ListTools, LoginPage, LogoutPage, ManageProject, ManageTool, ManageUser, Privacy, ProfilePage, RegisterPage, Terms, UpdateProfile } from '../../pages';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route exact element={<PrivateRoute />}>
          <Route path='/admin/dashboard' element={<DashboardAdmin />} />
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
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ListTools />} />
        <Route path="/projects" element={<ListProject />} />
        <Route path="/page/terms" element={<Terms />} />
        <Route path="/page/contact" element={<Contact />} />
        <Route path="/page/privacy" element={<Privacy />} />

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