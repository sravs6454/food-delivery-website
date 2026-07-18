/*
import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Fetch search results when searchTerm changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: searchTerm,
              client_id: 'G9AefR9AXrxMlg4jdQEPVZa_T0b6Kgx9BpFwzi_U3Mk',
              per_page: 5,
            },
          });
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Close search & profile dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-search")) {
        setIsSearchOpen(false);
      }
      if (!event.target.closest(".navbar-profile")) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Toggle search input visibility
  const toggleSearchBox = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Handle selecting a search result
  const handleSearchItemClick = (event, item) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(item.alt_description)}`);
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };
  

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>

      </ul>

      <div className="navbar-right">
        {/* Search Box 
        <div className="navbar-search">
          <div className="search-icon-container" onClick={toggleSearchBox}>
            <img src={assets.search_icon} alt="Search" className="search-icon" />
          </div>
          
          {isSearchOpen && (
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && searchResults.length > 0 && (
                <div className="navbar-search-results">
                  {searchResults.map((result) => (
                    <div key={result.id} className="search-result-item" onClick={(e) => handleSearchItemClick(e, result)}>
                      <img src={result.urls.small} alt={result.alt_description} />
                      <p>{result.alt_description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart Icon 
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {/* Profile / Login 
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <img src={assets.profile_icon} alt="Profile" />
            {isProfileOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
*/1


import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems, getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Fetch search results
  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: searchTerm,
              client_id: 'G9AefR9AXrxMlg4jdQEPVZa_T0b6Kgx9BpFwzi_U3Mk',
              per_page: 5,
            },
          });
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-search")) {
        setIsSearchOpen(false);
      }
      if (!event.target.closest(".navbar-profile")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleSearchBox = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSearchItemClick = (event, item) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(item.alt_description)}`);
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const totalCartItems = Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
      </ul>

      <div className="navbar-right">

        {/* Search */}
        <div className="navbar-search">
          <div className="search-icon-container" onClick={toggleSearchBox}>
            <img src={assets.search_icon} alt="Search" className="search-icon" />
          </div>
          {isSearchOpen && (
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && searchResults.length > 0 && (
                <div className="navbar-search-results">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={(e) => handleSearchItemClick(e, result)}
                    >
                      <img src={result.urls.small} alt={result.alt_description} />
                      <p>{result.alt_description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="navbar-search-icon cart-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
            {totalCartItems > 0 && <span className="cart-count-badge">{totalCartItems}</span>}
          </Link>
        </div>

        {/* Profile / Login */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <img src={assets.profile_icon} alt="Profile" />
            {isProfileOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;







/*import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'; // Ensure this context is defined properly
import { assets } from '../../assets/assets'; // Make sure assets are available

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('menu');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // Handle undefined or invalid total cart amount
  const totalCartAmount = getTotalCartAmount ? getTotalCartAmount() : 0;

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='logo' />
      </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          home
        </Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
          menu
        </a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>
          mobile-app
        </a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div className={totalCartAmount === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="Orders Icon" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
*/
