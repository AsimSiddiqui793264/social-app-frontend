import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <div className="text-center">
          <h5 className="fw-bold">SocialApp</h5>

          <p className="text-white-50 mb-2">
            Connect. Share. Discover.
          </p>

          <small className="text-white-50">
            © {new Date().getFullYear()} SocialApp. All rights reserved.
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;