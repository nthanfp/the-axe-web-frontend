import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../utils/Common';

export default function PrivateRoutes() {
  let userLogged = isLoggedIn();
  return (
    <>
      {userLogged ? <Outlet /> : <Navigate to="/account/login" />};
    </>

  )

}