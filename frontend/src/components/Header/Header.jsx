/*import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleViewMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button onClick={handleViewMenu} style={{ cursor: "pointer" }}>View Menu</button>
      </div>
    </div>
  );
};


export default Header;
*/



import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleViewMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes 
          crafted with the finest ingredients and culinary expertise. Our 
          mission is to satisfy your cravings and elevate your dining 
          experience, one delicious meal at a time.
        </p>
        <button onClick={handleViewMenu} className="view-menu-btn">
          {showMenu ? "Hide Menu" : "View Menu"}
        </button>

        {/* Menu List (shown when showMenu is true) */}
        {showMenu && (
          <div className="menu-list">
            <ul>
              {["Salad", "Rolls", "Desserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles","Burgers","Drinks","Pizza","Biryani"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
