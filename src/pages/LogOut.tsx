import React from "react";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <span>
      <button type="button" onClick={handleLogOut} className="btn btn-primary">
        log out
      </button>
    </span>
  );
};

export default LogOut;
