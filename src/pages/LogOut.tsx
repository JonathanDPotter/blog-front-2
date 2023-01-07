import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { Button } from "react-bootstrap";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Log Out
      </Button>

      <Modal
        title="Log Out"
        heading="Do you want to log out?"
        body="We're sad to see you go."
        confirm={handleLogOut}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default LogOut;
