import React from 'react';
import { Container, Navbar, Nav, Image, Button  } from 'react-bootstrap';
import { Link } from 'react-scroll'; 
import './Header.css'; 
import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="#" className="logo"><Image className="logo_image" src={Logo} alt="logo image" fluid /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
               
                <Link
                className='p-25'
                  activeClass="active"
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button className="home_button">Home</Button>
                </Link> 
               
                <Link
                  activeClass="active"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                   <Button className="admin_button">Admin</Button>
                </Link>
               
                <Link
                  
                  activeClass="active"
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button className="user_button">User</Button>
                </Link>


                <Link
                  
                  activeClass="active"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button className="user_button">About</Button>
                </Link>
               
            </Nav>
            

            <div className="profile-section">
          <Button className="profile_button">Profile</Button>
            {/* You can add more profile-related elements here */}
          </div>

          </Navbar.Collapse>
          
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
