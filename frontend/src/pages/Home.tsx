import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const { items: products, status } = useSelector((state: RootState) => state.products);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Premium Essentials</span>
              <h1 className="text-6xl md:text-7xl font-serif font-bold leading-tight mb-6 text-balance">
                Quality Goods for the <span className="italic">Modern Home</span>
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                Discover our curated selection of timeless pieces, crafted with precision and designed to elevate your everyday life.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/categories')}
                  className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 group"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/categories')}
                  className="px-8 py-4 border border-black/10 text-black font-bold rounded-full hover:bg-black/5 transition-all"
                >
                  View Collections
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden lg:block relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" 
                  alt="Featured Product" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-bold">"Best quality I've ever seen in a minimalist brand."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Free Shipping</h4>
                <p className="text-sm text-gray-500">On all orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Secure Payment</h4>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Easy Returns</h4>
                <p className="text-sm text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-500">Check out our latest products just landed in store.</p>
          </div>
          <Link to="/categories" className="px-6 py-2 border border-black rounded-full font-bold hover:bg-black hover:text-white transition-all">
            View All Products
          </Link>
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Designed for <br/>Longevity</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We don't believe in fast fashion. Our pieces are designed to last for years, not seasons. We use the highest quality materials and work with artisans who share our commitment to excellence.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-3xl font-bold mb-1">100%</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Organic Cotton</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold mb-1">5k+</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Happy Customers</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-black text-white font-bold rounded-full">Our Story</button>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800" 
                  alt="Process" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-black text-white rounded-[3rem] p-12 md:p-20 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">Subscribe to our newsletter and be the first to know about new drops and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 bg-white/10 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all">
              Join Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
