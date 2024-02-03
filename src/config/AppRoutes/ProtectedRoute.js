import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/Common';

const ProtectedRoute = ({ element, ...rest }) => {
  return isLoggedIn() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/account/login" replace />
  );
};

export default ProtectedRoute;
