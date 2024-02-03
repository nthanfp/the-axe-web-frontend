import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// import navbarData from './navbarData.json';

// Define your dynamic data
const navbarData = {
  brand: { label: process.env.REACT_APP_NAME, link: '/' },
  leftItems: [
    { label: 'Home', link: '/', icon: faHome },
    // {
    //   label: 'Dropdown Left',
    //   icon: faHome,
    //   dropdownItems: [
    //     { label: 'Action', link: '/' },
    //     { label: 'Another action', link: '/' },
    //     { label: 'Something else here', link: '/' },
    //   ],
    // },
  ],
  rightItems: [
    { label: 'Login', link: '/account/login', icon: faSignInAlt },
    { label: 'Register', link: '/account/register', icon: faUserPlus },
  ],
};

const MyNavbar = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to={navbarData.brand.link}>
          {navbarData.brand.label}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* left */}
          <Nav className="mr-auto">
            {navbarData.leftItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
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
                  <Nav.Link as={Link} to={item.link}>
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                    {item.label}
                  </Nav.Link>
                )}
              </React.Fragment>
            ))}
          </Nav>
          {/* right */}
          <Nav>
            {navbarData.rightItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
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
