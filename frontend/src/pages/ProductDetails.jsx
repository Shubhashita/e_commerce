import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocalhost ? 'http://localhost:5000' : (process.env.REACT_APP_API_URL || 'http://localhost:5000');
    const API_URL = `${BASE_URL}/api/products`;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(API_URL);
                const productList = Array.isArray(res.data) ? res.data : (res.data.products || []);
                const found = productList.find(p => p._id === id);
                setProduct(found);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch product", err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, API_URL]);

    const handleAddToCart = async () => {
        const res = await addToCart(product._id, quantity);
        if (res.success) {
            alert("Added to cart");
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <div className="bg-gray-100 aspect-[4/5] overflow-hidden">
                        <img
                            src={product.image || 'https://via.placeholder.com/800x1000'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                            <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
                            <p className="text-2xl font-light">${product.price}</p>
                        </div>

                        <div className="prose text-gray-600">
                            <p>{product.description}</p>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center border border-gray-300">
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >-</button>
                                    <span className="px-4 py-2 text-lg">{quantity}</span>
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >+</button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-colors"
                            >
                                Add to Bag
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 space-y-2 pt-6">
                            <p>Free shipping on orders over $100</p>
                            <p>30-day return policy</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
