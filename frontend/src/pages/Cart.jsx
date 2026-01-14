import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, updateQuantity } = useContext(CartContext);
    const { items, totalPrice } = cart;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <h1 className="text-3xl font-serif font-bold mb-8">Shopping Bag</h1>

                {items && items.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {items.map(item => (
                                <div key={item._id} className="flex gap-6 border-b border-gray-100 pb-6">
                                    <div className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.product.image || 'https://via.placeholder.com/150'}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-lg">{item.product.name}</h3>
                                                <p className="font-serif font-bold">${item.product.price}</p>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">{item.product.category}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border border-gray-300">
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                >-</button>
                                                <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => updateQuantity(item.product._id, 0)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="w-full lg:w-96 bg-gray-50 p-8 h-fit">
                            <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>
                            <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg mb-8">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                            <button className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-colors">
                                Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl mb-8">Your bag is empty.</p>
                        <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 uppercase tracking-widest text-sm font-bold">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
