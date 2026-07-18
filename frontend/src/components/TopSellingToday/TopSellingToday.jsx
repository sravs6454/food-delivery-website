/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopSellingToday.css';

const TopSellingToday = () => {
  const [topItems, setTopItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
      axios.get('http://localhost:4000/api/top-today')
      .then(res => setTopItems(res.data.topSellingToday))
      .catch(err => console.error('Error fetching top items:', err));
  }, []);

  const visibleItems = showAll ? topItems : topItems.slice(0, 3);

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-heading">🔥 Today’s Best Sellers</h2>
      <ul className="top-selling-list">
        {visibleItems.map((item, idx) => (
          <li key={idx} className="top-selling-item">
            <span>{item.name}</span> 
            <span className="order-count">({item.count} orders)</span>
          </li>
        ))}
      </ul>
      {topItems.length > 3 && (
        <button className="view-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View Less' : 'View More'}
        </button>
      )}
    </div>
  );
};

export default TopSellingToday;
*/1


/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopSellingToday.css';

const TopSellingToday = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/top-today')
      .then(res => setTopItems(res.data.topSellingToday))
      .catch(err => console.error('Error fetching top items:', err));
  }, []);

  const placeOrder = async (item) => {
    try {
      const userId = "67598f16af9814fbc7c20ede"; // Get this dynamically in real use
      const orderPayload = {
        userId,
        items: [{
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        }],
        amount: item.price,
        date: new Date(),
        status: "Pending",
        payment: false
      };

      await axios.post('http://localhost:4000/api/order', orderPayload);
      alert(`Order placed for ${item.name}!`);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-heading">💥 Today's Food Hits</h2>
      <div className="top-items-horizontal-scroll">
  {topItems.length === 0 ? (
    <p>No popular items yet today! 💤</p>
  ) : (
    topItems.map((item, idx) => (
      <div key={idx} className="top-item-card-horizontal">
        <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
        <div className="top-item-info">
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <p>Ordered {item.count} times</p>
          <button className="order-btn" onClick={() => placeOrder(item)}>Order Now</button>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default TopSellingToday;
*/2


/*
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TopSellingToday.css';

const TopSellingToday = () => {
  const [topItems, setTopItems] = useState([]);
  const scrollRef = useRef(null); // 👈 for horizontal scrolling

  useEffect(() => {
    axios.get('http://localhost:4000/api/top-today')
      .then(res => setTopItems(res.data.topSellingToday))
      .catch(err => console.error('Error fetching top items:', err));
  }, []);

  const placeOrder = async (item) => {
    try {
      const userId = "67598f16af9814fbc7c20ede";
      const orderPayload = {
        userId,
        items: [{
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        }],
        amount: item.price,
        date: new Date(),
        status: "Pending",
        payment: false
      };

      await axios.post('http://localhost:4000/api/order', orderPayload);
      alert(`Order placed for ${item.name}!`);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order.');
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-heading">💥 Today's Food Hits</h2>
      <div className="top-selling-scroll-corner">
        
  <div className="scroll-btn-corner left" onClick={scrollLeft}>❮</div>

  <div className="top-items-horizontal-scroll" ref={scrollRef}>
    {topItems.length === 0 ? (
    <p className="no-items-message">No popular items yet today! 💤</p>

  ) : 
    topItems.map((item, idx) => (
      <div key={idx} className="top-item-card-horizontal">
        <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
        <div className="top-item-info">
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <p>Ordered {item.count} times</p>
          <button className="order-btn" onClick={() => placeOrder(item)}>Order Now</button>
        </div>
      </div>
    ))}
  </div>

  <div className="scroll-btn-corner right" onClick={scrollRight}>❯</div>
</div>

    </div>
  );
};

export default TopSellingToday;
*/3

/*
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TopSellingToday.css';
import { StoreContext } from '../../Context/StoreContext';

const TopSellingToday = () => {
  const [topItems, setTopItems] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart, food_list } = useContext(StoreContext);

  useEffect(() => {
    axios.get('http://localhost:4000/api/top-today')
      .then(res => setTopItems(res.data.topSellingToday))
      .catch(err => console.error('Error fetching top items:', err));
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });

  const addToCartAndRedirect = (itemName) => {
    const matched = food_list.find(item => item.name === itemName);
    if (matched) {
      addToCart(matched._id);
      navigate('/cart');
    } else {
      alert("Item not found in product list");
    }
  };

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-heading">💥 Today's Food Hits</h2>
      <div className="top-selling-scroll-corner">
        <div className="scroll-btn-corner left" onClick={scrollLeft}>❮</div>

        <div className="top-items-horizontal-scroll" ref={scrollRef}>
          {topItems.length === 0 ? (
            <p className="no-items-message">No popular items yet today! 💤</p>
          ) : (
            topItems.map((item, idx) => (
              <div key={idx} className="top-item-card-horizontal">
                <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
                <div className="top-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <p>Ordered {item.count} times</p>
                  <button className="order-btn" onClick={() => addToCartAndRedirect(item.name)}>Order Now</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="scroll-btn-corner right" onClick={scrollRight}>❯</div>
      </div>
    </div>
  );
};

export default TopSellingToday;
*/4


import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TopSellingToday.css';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const TopSellingToday = () => {
  const [topItems, setTopItems] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { food_list, setItemQuantity } = useContext(StoreContext);

  useEffect(() => {
    axios.get('http://localhost:4000/api/top-today')
      .then(res => {
        const updatedItems = res.data.topSellingToday.map(item => ({
          ...item,
          quantity: 0
        }));
        setTopItems(updatedItems);
      })
      .catch(err => console.error('Error fetching top items:', err));
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });

  const increaseQty = (idx) => {
    const updated = [...topItems];
    updated[idx].quantity += 1;
    setTopItems(updated);
  };

  const decreaseQty = (idx) => {
    const updated = [...topItems];
    if (updated[idx].quantity > 0) {
      updated[idx].quantity -= 1;
      setTopItems(updated);
    }
  };

  const addToCartAndRedirect = (itemName, quantity) => {
    const matched = food_list.find(item => item.name === itemName);
    if (matched) {
      setItemQuantity(matched._id, quantity);
      toast.success(`${quantity} x ${itemName} added to cart!`);
      navigate('/cart');
    } else {
      toast.error("Item not found");
    }
  };

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-heading">🌟 Today's Food Hits</h2>
      <div className="top-selling-scroll-corner">
        <div className="scroll-btn-corner left" onClick={scrollLeft}>❮</div>

        <div className="top-items-horizontal-scroll" ref={scrollRef}>
          {topItems.length === 0 ? (
            <p className="no-items-message">No popular items yet today! 💤</p>
          ) : (
            topItems.map((item, idx) => (
              <div key={idx} className="top-item-card-horizontal">
                <div className="image-box">
                  <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />

                  {item.quantity === 0 ? (
                    <button className="add-btn" onClick={() => increaseQty(idx)}>+</button>
                  ) : (
                    <div className="qty-bubble">
                      <button onClick={() => decreaseQty(idx)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(idx)}>+</button>
                    </div>
                  )}
                </div>

                <div className="top-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <p>Ordered {item.count} times</p>
                  <button
                    className="order-btn"
                    onClick={() => addToCartAndRedirect(item.name, item.quantity)}
                    disabled={item.quantity === 0}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="scroll-btn-corner right" onClick={scrollRight}>❯</div>
      </div>
    </div>
  );
};

export default TopSellingToday;
