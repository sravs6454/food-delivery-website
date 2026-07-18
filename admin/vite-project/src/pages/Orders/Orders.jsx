/*import React, { useEffect, useState } from 'react'
import './Orders.css'
import {toast} from "react-toastify"
import axios from "axios"
import {assets} from "../../assets/assets"


const Orders = ({url}) => {


  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data);
    }
    else{
      toast.error("Error")

    }
  }

  useEffect(()=> {
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>{
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1) {
                    return item.name + " x " + item.quantity
                  }else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Orders
*/1


/*
import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };


  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items && order.items.length > 0
                  ? order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })
                  : "No items in this order"}
              </p>
              <p className="order-item-name">{order.address.firstName+ " "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phonenumber}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=> statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
*/2


import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders with token
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Add token
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token }
      });

      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Orders:", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };

  // ✅ Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      }, {
        headers: { token }
      });

      if (response.data.success) {
        fetchAllOrders(); // Refresh orders
        toast.success("Order status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Status Error:", err);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />

            <div>
              <p className="order-item-food">
                {order.items?.length > 0
                  ? order.items.map((item, index) =>
                      `${item.name} x ${item.quantity}${index < order.items.length - 1 ? ', ' : ''}`
                    )
                  : "No items in this order"}
              </p>
              <p className="order-item-name">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address?.street},</p>
                <p>{order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address?.phonenumber}</p>
            </div>

            <p>Items: {order.items?.length}</p>
            <p>₹{order.amount}</p>

            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
