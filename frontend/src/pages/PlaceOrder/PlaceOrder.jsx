/*import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phonenumber:""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=> {
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+10,

    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{ token }});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=> {
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text"  placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text"  placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text"  placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phonenumber' onChange={onChangeHandler} value={data.phonenumber} type='text' placeholder='Phone Number' />

      </div>
      <div className='place-order-right'>

        <div className='cart-total'>
          <h2> Cart Totals</h2>
          <div>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
          </div>   
        </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>


      </div>
    </form>
  )
}

export default PlaceOrder 
*/


/*
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Load saved form data from localStorage when the component mounts
  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutData"));
    return savedData || {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phonenumber: ""
    };
  });

  const [phoneError, setPhoneError] = useState(""); // Phone number validation error state

  // Handle input changes and update localStorage
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "phonenumber") {
      if (!/^\d*$/.test(value)) return; // Only allow numbers
      if (value.length > 10) return; // Restrict to 10 digits
    }

    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    localStorage.setItem("checkoutData", JSON.stringify(updatedData)); // Save to localStorage
  };

  // Form validation before placing an order
  const validateForm = () => {
    if (data.phonenumber.length < 10) {
      setPhoneError("⚠️ Phone number must be exactly 10 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };

  // Handle form submission (Place Order)
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        localStorage.removeItem("checkoutData"); // Clear saved data after successful order
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Redirect if no token or empty cart
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input 
          required 
          name='phonenumber' 
          onChange={onChangeHandler} 
          value={data.phonenumber} 
          type='text' 
          placeholder='Phone Number' 
          maxLength="10"
        />
        {phoneError && <p className="error">{phoneError}</p>} 
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p> 
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
            </div>   
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
*/



import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("checkoutData"));
    return savedData || {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phonenumber: ""
    };
  });

  const [phoneError, setPhoneError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online Payment"); // Default to Online Payment

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "phonenumber") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    localStorage.setItem("checkoutData", JSON.stringify(updatedData));
  };

  const validateForm = () => {
    if (data.phonenumber.length < 10) {
      setPhoneError("⚠️ Phone number must be exactly 10 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
      paymentMethod: paymentMethod,
    };

    if (paymentMethod === "Cash on Delivery") {
      try {
        let response = await axios.post(url + "/api/order/place", orderData, {
          headers: { token }
        });
    
        if (response.data.success) {
          alert("Order placed successfully 🎉");
          localStorage.removeItem("checkoutData");
          navigate("/myorders");
        } else {
          alert("Error placing order. Please try again.");
        }
      } catch (error) {
        console.error("Order placement error:", error);
        alert("Something went wrong. Please try again.");
      }
      return;
    }
    
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        localStorage.removeItem("checkoutData");
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input 
          required 
          name='phonenumber' 
          onChange={onChangeHandler} 
          value={data.phonenumber} 
          type='text' 
          placeholder='Phone Number' 
          maxLength="10"
        />
        {phoneError && <p className="error">{phoneError}</p>}
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
            </div>   
          </div>

          {/* Payment Method Selection */}
          <div className="payment-method">
            <h3>Select Payment Method</h3>
            <label>
              <input type="radio" name="payment" value="Online Payment" checked={paymentMethod === "Online Payment"} onChange={() => setPaymentMethod("Online Payment")} />
              Online Payment
            </label>
            <label>
              <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} />
              Cash on Delivery
            </label>
          </div>

          <button type='submit'>{paymentMethod === "Cash on Delivery" ? "PLACE ORDER" : "PROCEED TO PAYMENT"}</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
