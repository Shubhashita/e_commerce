import React, { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Prevent navigation when clicking button
        e.preventDefault();
        const res = await addToCart(product._id, 1);
        if (res.success) {
            alert("Added to cart");
        } else {
            alert(res.message);
        }
    };

    return (
        <div onClick={() => navigate(`/product/${product._id}`)} className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'}
                    alt={product.name}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                >
                    <FiShoppingCart size={20} />
                </button>
            </div>
            <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-lg font-serif font-bold">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
