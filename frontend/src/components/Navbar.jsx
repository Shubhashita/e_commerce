import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiMoreVertical, FiSettings, FiPackage } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-serif font-bold tracking-tighter text-gray-900 group">
                        LUXE<span className="text-accent group-hover:text-amber-500 transition-colors">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 items-center">
                        <Link to="/" className="text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Home</Link>
                        <Link to="/shop" className="text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Shop</Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-sm uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">Admin</Link>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                                    <FiMoreVertical size={24} className="text-gray-600" />
                                </button>
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 overflow-hidden">
                                    {/* Profile Section */}
                                    <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="w-full text-left px-6 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center transition-colors font-medium">
                                                <FiSettings className="mr-3 text-red-400" /> Admin Dashboard
                                            </Link>
                                        )}

                                        <button onClick={handleLogout} className="w-full text-left px-6 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors font-medium">
                                            <FiLogOut className="mr-3" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm uppercase tracking-widest text-gray-900 hover:text-accent font-medium">Login</Link>
                        )}

                        <Link to="/cart" className="relative text-gray-600 hover:text-black transition-colors">
                            <FiShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 focus:outline-none">
                            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg fade-in">
                    <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-900">Home</Link>
                        <Link to="/shop" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-900">Shop</Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-medium text-red-500">Admin Dashboard</Link>
                        )}
                        <Link to="/cart" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-900 flex items-center">
                            Cart ({cartCount})
                        </Link>
                        {user ? (
                            <>
                                <span className="text-sm font-serif text-gray-500">Hello, {user.name}</span>
                                <button onClick={handleLogout} className="text-lg font-medium text-red-500">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-900">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
