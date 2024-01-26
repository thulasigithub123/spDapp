import React from 'react';
import { Container } from 'react-bootstrap';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-custom py-4">
      <Container>
        <div className="footer-content footer">
          <p>Contact us at thulasi@spdapp.com</p>
          <p>Chennai, India</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
