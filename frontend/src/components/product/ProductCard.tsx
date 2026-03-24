import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/WishList';
import type { RootState } from '../../redux/store';
import type { Product } from '../../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1, description: product.description || '', countInStock: product.countInStock || 0 }));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 card-shadow transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              {product.category}
            </span>
          </div>
          
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-accent"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            <span className="text-[10px] text-gray-400 ml-1 font-bold">(4.8)</span>
          </div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-1">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-xs font-bold text-emerald-600">In Stock</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
