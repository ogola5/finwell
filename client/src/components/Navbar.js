import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // FontAwesome icons
import "./Navbar.css";
import logo from "../images/finwell.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle the menu visibility

  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="logo-container">
        <img src={logo} alt="FinWell Logo" className="logo" />
      </div>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${isOpen ? "show" : ""}`}>
        <li>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics" onClick={() => setIsOpen(false)}>Analytics</Link>
        </li>
        <li>
          <Link to="/blogfeed" onClick={() => setIsOpen(false)}>BlogFeed</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => setIsOpen(false)}>Log Out</Link>
        </li>
                <li>
          <Link to="/profile" onClick={() => setIsOpen(false)}>My Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
