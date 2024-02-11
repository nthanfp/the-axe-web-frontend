import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedInAsAdmin } from '../../utils/Common';

export default function PrivateAdminRoutes() {
  let adminLogged = isLoggedInAsAdmin();
  return (
    <>
      {adminLogged ? <Outlet /> : <Navigate to="/account/login" />};
    </>

  )

}