import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Truck, ShieldCheck, Wallet, Smartphone, Landmark, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.user);
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    address: '',
    city: '',
    zip: '',
    country: '',
    paymentMethod: 'credit_card'
  });

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit / Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI (GPay, PhonePe)', icon: Smartphone },
    { id: 'net_banking', name: 'Net Banking', icon: Landmark },
    { id: 'wallet', name: 'Digital Wallets', icon: Wallet },
    { id: 'cod', name: 'Cash on Delivery', icon: Truck }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsProcessing(true);
    try {
      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item.id
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.zip,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: total,
        taxPrice: total * 0.1,
        shippingPrice: total > 500 ? 0 : 50,
        totalPrice: total + (total * 0.1) + (total > 500 ? 0 : 50)
      };

      await api.post('/orders', orderData);
      setOrderSuccess(true);
      dispatch(clearCart());
      setTimeout(() => navigate('/orders'), 3000);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="pt-32 pb-24 px-6 flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold">Order Confirmed!</h1>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            Thank you for your purchase. Your order has been placed successfully and is being processed.
          </p>
          <p className="text-primary font-bold">Redirecting to your orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>1</div>
            <div className="h-px flex-1 bg-white/10"></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>2</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 ? (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold">Shipping Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Shipping Address</label>
                    <input name="address" value={formData.address} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">City</label>
                    <input name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">ZIP / Postal Code</label>
                    <input name="zip" value={formData.zip} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Country</label>
                    <input name="country" value={formData.country} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:border-black focus:outline-none transition-colors" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold">Payment Method</h2>
                <div className="grid grid-cols-1 gap-4">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id} 
                      className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-black bg-black/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${formData.paymentMethod === method.id ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{method.name}</span>
                      </div>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id} 
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="w-5 h-5 accent-black"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all">
                  Back
                </button>
              )}
              <button 
                type="submit" 
                disabled={isProcessing}
                className="flex-[2] py-5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing...' : step === 1 ? 'Continue to Payment' : 'Complete Purchase'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:sticky lg:top-32 h-fit space-y-8">
          <div className="glass rounded-3xl p-8 space-y-8">
            <h3 className="text-2xl font-serif font-bold">Order Summary</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    <p className="text-primary font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
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
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-primary">${(total + (total * 0.1) + (total > 500 ? 0 : 50)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm px-4">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <p>Your transaction is secure and encrypted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
