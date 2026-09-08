import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <Container>
        <Row className="align-items-center min-vh-100">

          {/* LEFT SIDE */}
          <Col lg={6} className="landing-content">

            <div className="logo">
              Social<span>App</span>
            </div>

            <h1>
              Connect with people.
              <br />
              <span>Share your world.</span>
            </h1>

            <p className="landing-description">
              Welcome to SocialApp, a place where you can connect with
              friends, share your thoughts, discover new people and
              build your community.
            </p>

            <div className="landing-buttons">

              <Link to="/signup">
                <Button className="signup-btn">
                  Create Account
                </Button>
              </Link>

              <Link to="/login">
                <Button className="login-btn">
                  Login
                </Button>
              </Link>

            </div>

            <p className="bottom-text">
              Join SocialApp today and start connecting!
            </p>

          </Col>


          {/* RIGHT SIDE */}
          <Col lg={6} className="landing-image-section">

            <div className="social-card card-one">
              <div className="avatar">👨🏻‍💻</div>
              <div>
                <strong>Ali Khan</strong>
                <small>Just joined SocialApp</small>
              </div>
            </div>

            <div className="social-card card-two">
              <div className="avatar">👩🏻‍💻</div>
              <div>
                <strong>Sarah Ahmed</strong>
                <small>Shared a new post ❤️</small>
              </div>
            </div>

            <div className="main-circle">
              <div className="circle-content">
                <span>👥</span>
                <h3>Connect</h3>
                <p>Share • Discover • Connect</p>
              </div>
            </div>

            <div className="social-card card-three">
              <div className="avatar">👨🏻</div>
              <div>
                <strong>Ahmed Raza</strong>
                <small>Started following you</small>
              </div>
            </div>

          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Landing; 