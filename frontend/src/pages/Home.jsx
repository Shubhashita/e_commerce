import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocalhost ? 'http://localhost:5000' : (process.env.REACT_APP_API_URL || 'http://localhost:5000');
    const API_URL = `${BASE_URL}/api/products`;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(API_URL);
                const productList = Array.isArray(res.data) ? res.data : (res.data.products || []);
                // Just take first 4 for home page
                setProducts(productList.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Hero />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Trending Now</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Discover the latest trends in fashion and elevate your style with our premium selection.</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Promo Section */}
                <section className="bg-primary text-white py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-serif font-bold">The Sustainable Future</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We believe in fashion that respects the planet. Our new collection is crafted from 100% organic materials and ethically sourced fibers.
                            </p>
                            <button className="border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                Read Our Story
                            </button>
                        </div>
                        <div className="h-[400px] bg-gray-800 bg-[url('https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80')] bg-cover bg-center"></div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
