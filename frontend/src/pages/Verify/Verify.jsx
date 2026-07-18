/*import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => { // Corrected syntax here
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Added dependency array to prevent infinite calls

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
*/



import React, { useEffect, useContext, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying payment...");

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });

            if (response.data.success) {
                setMessage("✅ Payment successful! Redirecting to your orders...");
                setTimeout(() => navigate("/myorders"), 3000); // Redirect after 3 seconds
            } else {
                setMessage("❌ Payment failed. Redirecting to home...");
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setMessage("⚠️ Error processing payment. Redirecting...");
            setTimeout(() => navigate("/"), 3000);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); 

    return (
        <div className='verify'>
            <h2>{message}</h2>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
