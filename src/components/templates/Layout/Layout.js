import React from 'react';

import '../../../assets/css/styles.css'

import { MyNavbar } from '../../organisms';

const Layout = ({ children }) => {
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
