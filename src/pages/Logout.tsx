import { useState } from "react";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { useAppDispatch } from "../store/hooks";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(true);

  const handleHide = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Modal
      title="Log Out?"
      body="Do you want to log out?"
      onHide={handleHide}
      show={showModal}
      confirm={handleLogOut}
    />
  );
};

export default Logout;
