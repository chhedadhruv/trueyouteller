import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';
import logo from '../images/trueyouteller.webp';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="TrueYouTeller home" className="navbar-brand-logo" width="150" height="150" />
        </NavLink>
        <button
          type="button"
          className="menu-icon"
          onClick={handleClick}
          aria-label={click ? 'Close menu' : 'Open menu'}
          aria-expanded={click}
          aria-controls="nav-menu"
        >
          {click ? <FaTimes /> : <FaBars />}
        </button>
        <ul id="nav-menu" className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/types" className="nav-links" onClick={closeMobileMenu}>
              Types
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/compatibility" className="nav-links" onClick={closeMobileMenu}>
              Compatibility
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" onClick={closeMobileMenu}>
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-links" onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/test" className="nav-links nav-cta" onClick={closeMobileMenu}>
              Take the Test
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
