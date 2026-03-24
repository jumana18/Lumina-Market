
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { removeFromWishlist } from '../redux/slices/WishList';
import { addToCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.wishlist);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1, description: product.description || '', countInStock: product.countInStock || 0 }));
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Save items you love to your wishlist and they'll appear here.
        </p>
        <button 
          onClick={() => navigate('/categories')}
          className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="space-y-4">
          <span className="text-accent font-bold tracking-widest uppercase text-xs">Your Favorites</span>
          <h1 className="text-5xl font-serif font-bold">Wishlist</h1>
          <p className="text-gray-400 max-w-md">Items you've saved for later. Ready to make them yours?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => dispatch(removeFromWishlist(product.id))}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{product.category}</span>
                  <h3 className="text-xl font-bold mt-1">{product.name}</h3>
                </div>
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <Link 
                  to={`/product/${product.id}`}
                  className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center hover:bg-black/5 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
