import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faSignOutAlt, faUser, faCogs, faCode } from '@fortawesome/free-solid-svg-icons';

import { isLoggedIn } from '../../../utils/Common';

const navbarData = {
  brand: { label: process.env.REACT_APP_NAME, link: '/' },
  leftItems: [
    { label: 'Home', link: '/', icon: faHome },
    { label: 'Tools', link: '/tools', icon: faCogs },
    { label: 'Projects', link: '/projects', icon: faCode },
  ],
  rightItems: [
    {
      label: 'Login', link: '/account/login', icon: faSignInAlt, isLogged: false
    },
    {
      label: 'Register', link: '/account/register', icon: faUserPlus, isLogged: false
    },
    {
      label: 'My Account', icon: faUser, isLogged: true, dropdownItems: [
        { label: 'Dashboard', link: '/account' },
        { label: 'Update Profile', link: '/account/update-profile' },
        { label: 'Change Password', link: '/account/change-password' }
      ]
    },
    { label: 'Logout', link: '/account/logout', icon: faSignOutAlt, isLogged: true },
  ],
};

const MyNavbar = () => {
  // Filter the right items based on the user's login status
  const filteredRightItems = navbarData.rightItems
    .filter((item) => {
      if (item.isLogged) {
        // If the item requires login, check if the user is logged in
        return isLoggedIn();
      } else if (item.label === 'Login' || item.label === 'Register') {
        // Exclude both "Login" and "Register" if the user is not logged in
        return !isLoggedIn();
      }
      // Include other items without checking authentication
      return true;
    });

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container-fluid">
        {/* Brand */}
        <Navbar.Brand as={Link} to={navbarData.brand.link}>
          {navbarData.brand.label}
        </Navbar.Brand>

        {/* Navbar toggle button for smaller screens */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar content */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* Left items */}
          <Nav className="mr-auto">
            {navbarData.leftItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
                  // If the item has dropdown items, render a dropdown
                  <NavDropdown title={(
                    <>
                      {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                      {item.label}
                    </>
                  )} id={`dropdown-left-${index}`}>
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <NavDropdown.Item key={subIndex} as={Link} to={dropdownItem.link}>
                        {dropdownItem.icon && (
                          <FontAwesomeIcon icon={dropdownItem.icon} className="me-2" />
                        )}
                        {dropdownItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  // If the item does not have dropdown items, render a regular link
                  <Nav.Link as={Link} to={item.link}>
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                    {item.label}
                  </Nav.Link>
                )}
              </React.Fragment>
            ))}
          </Nav>

          {/* Right items */}
          <Nav>
            {filteredRightItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
                  // If the item has dropdown items, render a dropdown
                  <NavDropdown title={(
                    <>
                      {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                      {item.label}
                    </>
                  )} id={`dropdown-right-${index}`}>
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <NavDropdown.Item key={subIndex} as={Link} to={dropdownItem.link}>
                        {dropdownItem.icon && (
                          <FontAwesomeIcon icon={dropdownItem.icon} className="me-2" />
                        )}
                        {dropdownItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  // If the item does not have dropdown items, render a regular link
                  <Nav.Link as={Link} to={item.link}>
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                    {item.label}
                  </Nav.Link>
                )}
              </React.Fragment>
            ))}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
