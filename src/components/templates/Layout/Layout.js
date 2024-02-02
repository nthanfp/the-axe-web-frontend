import React from 'react';

import '../../../assets/css/styles.css'

import { Navbar } from '../../organisms';

const Layout = ({ children }) => {
	return (
		<div>
			{/* Navbar */}
			<Navbar/>
			
			{/* Page content */}
			<div className="container mt-4">{children}</div>
		</div>
	);
};

export default Layout;
