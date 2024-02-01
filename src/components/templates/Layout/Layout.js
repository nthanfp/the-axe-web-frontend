import React from 'react';

import '../../../assets/css/styles.css'

const Layout = ({ children }) => {
	return (
		<div>
			{/* Navbar */}
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container">
					<a className="navbar-brand" href="/">
						Your Logo
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<a className="nav-link" href="/">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/about">
									About
								</a>
							</li>
							{/* Add more navbar items as needed */}
						</ul>
					</div>
				</div>
			</nav>

			{/* Page content */}
			<div className="container mt-4">{children}</div>
		</div>
	);
};

export default Layout;
