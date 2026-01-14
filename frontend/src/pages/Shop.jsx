import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Shop = () => {
    const [products, setProducts] = useState([]); // reused as the main list now
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');

    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [page, setPage] = useState(1);

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocalhost ? 'http://localhost:5000' : (process.env.REACT_APP_API_URL || 'http://localhost:5000');
    const API_URL = `${BASE_URL}/api/products`;

    const fetchProducts = React.useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 10,
                search: search || undefined,
                category: category !== 'All' ? category : undefined
            };
            const res = await axios.get(API_URL, { params });
            setProducts(res.data.products);
            setPagination({
                currentPage: res.data.currentPage,
                totalPages: res.data.totalPages
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch products", err);
            setLoading(false);
        }
    }, [page, category, search, API_URL]);

    const [allCategories, setAllCategories] = useState(['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories']);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);



    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div>
                            <h3 className="font-serif font-bold text-xl mb-4">Search</h3>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-black"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-xl mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {allCategories.map(c => (
                                    <li key={c}>
                                        <button
                                            onClick={() => { setCategory(c); setPage(1); }}
                                            className={`text-sm ${category === c ? 'font-bold text-black' : 'text-gray-500 hover:text-black'} transition-colors`}
                                        >
                                            {c}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-8 flex justify-between items-center">
                            <h1 className="text-3xl font-serif font-bold">Shop</h1>
                            <p className="text-gray-500">Showing {products.length} results</p>
                        </div>

                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            disabled={pagination.currentPage === 1}
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            className="px-4 py-2 border border-gray-300 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </span>
                                        <button
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                            className="px-4 py-2 border border-gray-300 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {!loading && products.length === 0 && (
                            <div className="text-center py-20 text-gray-500">No products found.</div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Shop;
