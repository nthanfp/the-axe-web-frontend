import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Define your dynamic data
const navbarData = {
  brand: { label: process.env.REACT_APP_NAME, link: '/' },
  leftItems: [
    { label: 'Home', link: '/' },
    {
      label: 'Dropdown Left',
      dropdownItems: [
        { label: 'Action', link: '/' },
        { label: 'Another action', link: '/' },
        { label: 'Something else here', link: '/' },
      ],
    },
  ],
  rightItems: [
    { label: 'Login', link: '/login' },
    { label: 'Register', link: '/register' },
  ],
};

const MyNavbar = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand href={navbarData.brand.link}>{navbarData.brand.label}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* left */}
          <Nav className="mr-auto">
            {navbarData.leftItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
                  <NavDropdown title={item.label} id={`dropdown-left-${index}`}>
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <NavDropdown.Item key={subIndex} href={dropdownItem.link}>
                        {dropdownItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={item.link}>{item.label}</Nav.Link>
                )}
              </React.Fragment>
            ))}
          </Nav>
          {/* right */}
          <Nav>
            {navbarData.rightItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdownItems ? (
                  <NavDropdown title={item.label} id={`dropdown-right-${index}`}>
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <NavDropdown.Item key={subIndex} href={dropdownItem.link}>
                        {dropdownItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={item.link}>{item.label}</Nav.Link>
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