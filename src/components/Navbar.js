// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-modern">
      <div className="navbar-left">
        <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="logo.png" alt="Logo" style={{ height: "80px", marginRight: "10px" }} />
          <h2 style={{ margin: 0, color: "white" }}>Bookish</h2>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Dashboard</Link>
        <Link to="/Clubs">Clubs</Link>
        <Link to="/community">Discussions</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
