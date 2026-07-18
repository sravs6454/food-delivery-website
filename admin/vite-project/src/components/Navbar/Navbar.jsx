/*import React from 'react'
import './Navbar.css'
import { assets} from '../../assets/assets'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt='' />
        <img className='profile' src={assets.profile_image} alt=''/>
      
    </div>
  )
}

export default Navbar*/


/*
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown menu
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Redirect to Login Page
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />

      {/* Profile Image with onClick 
      <div className="profile-container">
        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={handleProfileClick}
        />

        {/* Dropdown Menu 
        {showDropdown && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleLogin}>Login</li> {/* ✅ Fixes Login Click 
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

*/



/*
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown menu
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Redirect to Admin Login Page
  
const handleLogin = () => {
  navigate("/admin-login");  // ✅ Navigates to Admin Login page
};

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />

      <div className="profile-container">
        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={handleProfileClick}
        />

        {showDropdown && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleLogin}>Login</li>  {/* ✅ Redirects to Admin Login 
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

*/



import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AdminLogin from "../AdminLogin"; // Import the AdminLogin modal
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown menu
  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Open login modal without closing dropdown
  const handleLoginClick = (e) => {
    e.stopPropagation(); // Prevents click from bubbling up to close dropdown
    setModalOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />

      {/* Profile Image */}
      <div className="profile-container" ref={dropdownRef}>
        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={handleProfileClick}
        />

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleLoginClick}>Login</li> {/* Does not close dropdown */}
              
            </ul>
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      {modalOpen && <AdminLogin isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Navbar;
