import React from 'react';
import { useSearchParams } from 'react-router-dom';

const OrderConfirmation = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="order-confirmation">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Your order ID is: <strong>{orderId}</strong></p>
            <p>Thank you for shopping with us! 🚀</p>
        </div>
    );
};

export default OrderConfirmation;
