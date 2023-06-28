import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { auth, signOut, user } = useAuth();
  console.log( user)


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar-fullscreen">

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
        <FontAwesomeIcon icon={faPalette} style={{ marginRight: "0.5rem", color: "#ffffff" }} />
          Virtual-Art-Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!auth && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {!auth && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Link} to="/Collection">
                Collection
              </Nav.Link>
            )}
          </Nav>
          <Nav>
          {auth && (
              <Nav.Link as={Link} >
                {user.email}
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Button} onClick={handleLogout}>
                LogOut
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </nav>
  );
};

export default NavBar;