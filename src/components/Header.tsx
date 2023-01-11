import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Button, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <Navbar as="header" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Text>
          <h1>Blog</h1>
        </Navbar.Text>
        <Nav
          className="justify-content-center"
          fill
          role="navigation"
          activeKey={window.location.pathname}
        >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {token ? (
              <Nav.Link href="/logout">Log Out</Nav.Link>
            ) : (
              <Nav.Link href="/login">Log In</Nav.Link>
            )}
          </Nav.Item>
          {token ? (
            <Nav.Item>
              <Nav.Link href="/makepost">Make a Post</Nav.Link>{" "}
            </Nav.Item>
          ) : null}
        </Nav>
      </Container>
      <Modal
        title="Log Out"
        heading="Do you want to log out?"
        body="We're sad to see you go."
        confirm={handleLogOut}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Navbar>
  );
};

export default Header;
