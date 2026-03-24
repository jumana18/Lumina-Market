import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-20 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
            <ShoppingBag className="w-8 h-8 text-emerald-500" />
            <span>LUMINA</span>
          </Link>
          <p className="text-zinc-400 max-w-sm mb-8">
            Crafting premium essentials for the modern lifestyle. We believe in quality, sustainability, and timeless design.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li><Link to="/" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
        <p>© 2024 LUMINA Market. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
