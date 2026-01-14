import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(false);

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocalhost ? 'http://localhost:5000' : (process.env.REACT_APP_API_URL || 'http://localhost:5000');
    const API_URL = `${BASE_URL}/api/cart`;

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchCart = async () => {
        if (!user) {
            setCart({ items: [], totalPrice: 0 });
            return;
        }
        try {
            const res = await axios.get(API_URL, getAuthHeader());
            setCart(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], totalPrice: 0 });
        }
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return { success: false, message: "Please user login to add items" };

        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/add`, { productId, quantity }, getAuthHeader());
            setCart(res.data);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            return { success: false, message: error.response?.data?.message || 'Error adding to cart' };
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axios.put(API_URL, { productId, quantity }, getAuthHeader());
            setCart(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, loading }}>
            {children}
        </CartContext.Provider>
    );
};
