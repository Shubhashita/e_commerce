import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-100">
            <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Fashion Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative text-center text-white space-y-6 px-4 animate-fade-in">
                <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase">New Collection</p>
                <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight">Summer Luxe</h1>
                <div className="pt-8">
                    <Link to="/shop" className="inline-block bg-white text-black px-12 py-4 uppercase tracking-widest text-sm font-bold hover:bg-black hover:text-white transition-all duration-300">
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
