import React from 'react';

const Navbar = () => {
    // Navbar data in JSON format
    const navbarData = {
        brand: { label: process.env.REACT_APP_NAME, link: '/' },
        leftItems: [
            { label: 'Home', link: '/' },
        ],
        rightItems: [
            { label: 'Login', link: '/login' },
            { label: 'Register', link: '/register' },
        ],
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href={navbarData.brand.link}>{navbarData.brand.label}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {navbarData.leftItems.map((item, index) => (
                            <a key={index} className="nav-link" href={item.link}>{item.label}</a>
                        ))}
                    </div>
                    {/* Navbar Right */}
                    <div className="navbar-nav">
                        {navbarData.rightItems.map((item, index) => (
                            <a key={index} className="nav-link" href={item.link}>{item.label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
