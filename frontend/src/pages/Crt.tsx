
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold">Your cart is empty</h1>
        <p className="text-gray-400 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our collections to find something you love.</p>
        <Link to="/categories" className="px-10 py-4 bg-primary text-black font-bold rounded-full hover:bg-accent transition-all flex items-center gap-2">
          Start Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-5xl font-serif font-bold">Shopping Cart</h1>
        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{items.length} Items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-8 p-8 glass rounded-3xl"
            >
              <img src={item.image} alt={item.name} className="w-full sm:w-40 aspect-square object-cover rounded-2xl" referrerPolicy="no-referrer" />
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-primary font-bold tracking-widest uppercase text-[10px]">{item.category}</span>
                    <h3 className="text-2xl font-serif font-bold">{item.name}</h3>
                    <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-8">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  <p className="text-2xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <Link to="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="lg:sticky lg:top-32 h-fit space-y-8">
          <div className="glass rounded-3xl p-8 space-y-8">
            <h3 className="text-2xl font-serif font-bold">Order Summary</h3>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{total > 500 ? 'Free' : '$50.00'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (10%)</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-6 border-t border-white/10">
                <span>Total</span>
                <span className="text-primary">${(total + (total * 0.1) + (total > 500 ? 0 : 50)).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-5 bg-black text-white font-bold rounded-full hover:bg-accent transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
