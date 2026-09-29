/*
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "http://localhost:4000";

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

            if (token) {
                try {
                    await axios.post(
                        `${url}/api/cart/remove`,
                        { itemId },
                        { headers: { token } }
                    );
                } catch (error) {
                    console.error("Error removing item from cart:", error);
                }
            }
        }
    };

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Memoized total cart amount for performance optimization
    const totalCartAmount = useMemo(() => getTotalCartAmount(), [cartItems, food_list]);

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data for authenticated user
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Initialize data on component mount
    useEffect(() => {
        const initializeData = async () => {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        };

        initializeData();
    }, []);

    // Context value to be shared
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        totalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
*/


import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "https://food-delivery-website-lz17.onrender.com";
    // ✅ Set item to specific quantity
    const setItemQuantity = (itemId, quantity) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: quantity,
        }));
    };

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

            if (token) {
                try {
                    await axios.post(
                        `${url}/api/cart/remove`,
                        { itemId },
                        { headers: { token } }
                    );
                } catch (error) {
                    console.error("Error removing item from cart:", error);
                }
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const totalCartAmount = useMemo(() => getTotalCartAmount(), [cartItems, food_list]);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        };

        initializeData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        totalCartAmount,
        url,
        token,
        setToken,
        setItemQuantity, // ✅ Exposed here
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
