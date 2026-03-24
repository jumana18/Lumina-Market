import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, LogOut, Plus, Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/userSlice';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // ✅ SAFE NAME FIX
  const firstName = userInfo?.name?.split(' ')?.[0] || 'User';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-black/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          LUMINA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Categories', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">

          <button className="hidden sm:block hover:text-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative group">
            <Heart className={`w-6 h-6 group-hover:text-red-500 transition-colors ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-6 h-6 group-hover:text-accent transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {userInfo ? (
            <div className="flex items-center gap-4">

              {userInfo.isAdmin && (
                <Link to="/add-product" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-bold">Add Product</span>
                </Link>
              )}

              <Link to="/profile" className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-bold">{firstName}</span>
              </Link>

              <Link to="/orders" className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-bold">Orders</span>
              </Link>

              <button onClick={handleLogout} className="hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {['Home', 'Categories', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;