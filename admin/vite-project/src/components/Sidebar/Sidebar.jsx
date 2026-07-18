/*import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage and update state
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Function to check login before navigating
  const handleProtectedNavigation = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Stop navigation
      alert("Please log in to proceed!");
      return;
    }
    navigate(path); // Proceed if logged in
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-options'>

        <NavLink to="/add" className="sidebar-option" onClick={(e) => handleProtectedNavigation(e, "/add")}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option" onClick={(e) => handleProtectedNavigation(e, "/list")}>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option" onClick={(e) => handleProtectedNavigation(e, "/orders")}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
*/


import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status on mount (ensure proper default behavior)
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false'); // Ensure it's properly set
    }
    console.log("Initial Login Status:", storedLoginStatus);
  }, []);

  // ✅ Listen for login state updates (cross-tab support)
  useEffect(() => {
    const updateLoginStatus = () => {
      const newStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(newStatus);
      console.log("Updated Login Status:", newStatus);
    };

    window.addEventListener('storage', updateLoginStatus);
    return () => {
      window.removeEventListener('storage', updateLoginStatus);
    };
  }, []);

  // ✅ Redirect to login if user tries to access protected routes without logging in
  useEffect(() => {
    const protectedRoutes = ['/add', '/list', '/orders'];
    if (!isLoggedIn && protectedRoutes.includes(window.location.pathname)) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // ✅ Handle navigation (restrict access when not logged in)
  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      alert("Please log in to proceed!");
      navigate('/login');
      return;
    }
    navigate(path);
  };

  // ✅ Handle Logout (clear session & redirect)
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    console.log("User Logged Out");
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-options'>

        {/* Add Items */}
        <div className="sidebar-option" onClick={() => handleNavigation("/add")}>
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </div>

        {/* List Items */}
        <div className="sidebar-option" onClick={() => handleNavigation("/list")}>
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </div>

        {/* Orders */}
        <div className="sidebar-option" onClick={() => handleNavigation("/orders")}>
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </div>

        {/* Logout Button */}
{isLoggedIn && (
  <div className="sidebar-option" onClick={() => {
    alert("Logout Successfully!");
    handleLogout();
  }}>
    <img
      src="https://www.shutterstock.com/image-illustration/logout-isolated-on-special-red-260nw-1164426883.jpg"
      alt="Logout"
    />
    <p>Logout</p>
  </div>
)}


      

      </div>
    </div>
  );
};

export default Sidebar;
