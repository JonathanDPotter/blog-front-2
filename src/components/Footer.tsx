import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-bg-dark container-fluid">
      <div className="row h-100 d-flex align-items-center">
        <div className="col">
          <span>2022 Jonathan Potter</span>
        </div>
        <div className="col">
          <nav
            className="w-100 d-flex justify-content-around"
            aria-label="secondary"
          >
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
