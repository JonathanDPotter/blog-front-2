import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Navbar as="footer" bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Text>2023 Jonathan Potter</Navbar.Text>
        <Nav fill activeKey={window.location.pathname}>
          <Nav.Item>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
