import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { logoutUser } from "../services/authApi";

import { logout } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Backend logout API
      await logoutUser();

      // Clear Redux + localStorage
      dispatch(logout());

      // Success message
      toast.success("Logout successful");

      // Go to login page
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Logout failed"
      );
    }
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm py-3"
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-primary fs-4"
        >
          SocialApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="ms-auto align-items-lg-center gap-lg-2">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Button
              variant="danger"
              className="rounded-3 px-4"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;