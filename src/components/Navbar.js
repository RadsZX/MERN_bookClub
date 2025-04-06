// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-modern">
      <div className="navbar-left">
        <h2 className="brand">📚 Bookish</h2>
      </div>
      <div className="navbar-right">
        <Link to="/">Dashboard</Link>
        <Link to="#">Clubs</Link>
        <Link to="#">My Books</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
