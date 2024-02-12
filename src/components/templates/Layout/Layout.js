import React, { useEffect } from 'react';

import '../../../assets/css/styles.css'

import { MyNavbar } from '../../organisms';

const Layout = ({ children, title = null }) => {
  useEffect(() => {
    document.title = title != null ? `${title} - The Axe Local` : `The Axe Local`;
  }, []);

  return (
    <div>
      {/* Navbar */}
      <MyNavbar />

      {/* Page content */}
      <div className="container mt-4">{children}</div>
    </div>
  );
};

export default Layout;
