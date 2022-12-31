import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import LogOut from "../pages/LogOut";

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);
  // const token = true;

  return (
    <header className="text-bg-dark container-fluid">
      <div className="row h-100 d-flex align-items-center">
        <div className="col">
          <h1>Blog</h1>
        </div>
        <div className="col">
          <nav
            className="d-flex justify-content-around my-auto"
            aria-label="primary"
          >
            <NavLink to="/">Home</NavLink>
            {token ? (
              <NavLink to="/logout">Log Out</NavLink>
            ) : (
              <NavLink to="/login">Log In</NavLink>
            )}
            {token ? <NavLink to="/makepost">Make a Post</NavLink> : null}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
