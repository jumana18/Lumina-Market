import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Calendar, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  if (loading) {
    return <div className="pt-32 pb-24 text-center">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">No orders yet</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't placed any orders yet. Start shopping to see your orders here.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>
          <p className="text-gray-400">Track and manage your recent purchases.</p>
        </div>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-black/5"
          >
            <div className="bg-gray-50 px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
                  <p className="font-bold">#LMN-{order.id}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Date</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
                  <p className="font-bold text-black">${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {order.isPaid ? 'Paid' : 'Pending Payment'}
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {order.orderItems.map((item: any) => (
                    <div key={item._id} className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.qty} x ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Shipping Address</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-500">{order.shippingAddress.address}</p>
                    <p className="text-gray-500">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p className="text-gray-500">{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
