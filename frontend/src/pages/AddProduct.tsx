import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Plus,
  Image as ImageIcon,
  Tag,
  DollarSign,
  List,
  ArrowLeft,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    images: '',
    countInStock: '',
    sizes: '',
    colors: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        alert('Please login as vendor');
        navigate('/login');
        return;
      }

      await api.post(
        '/products',
        {
          ...formData,
          price: Number(formData.price),
          countInStock: Number(formData.countInStock),
          images: formData.images
            ? formData.images.split(',').map((s) => s.trim())
            : [],
          sizes: formData.sizes
            ? formData.sizes.split(',').map((s) => s.trim())
            : [],
          colors: formData.colors
            ? formData.colors.split(',').map((s) => s.trim())
            : []
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error('Failed to add product:', error);
      const message = error.response?.data?.message || 'Failed to add product. Try again.';
      alert(error.response?.status === 403 ? 'Only vendors can add products' : message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-24 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold">Product Added!</h1>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Product submitted successfully. Waiting for approval.
          </p>
          <p className="text-black font-bold">Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  // Reusable Input Component for cleaner JSX
  const InputField = ({ icon: Icon, ...props }: any) => (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </Link>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold">Add New Product</h1>
          <p className="text-gray-500 text-lg">Fill details to add your product to the catalog.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm"
        >
          <InputField icon={Package} name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required />
          
          <div className="relative">
            <div className="absolute left-4 top-4 text-gray-400">
              <List size={18} />
            </div>
            <textarea 
              name="description" 
              placeholder="Description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField icon={DollarSign} name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
            <InputField icon={Layers} name="countInStock" type="number" placeholder="Stock Quantity" value={formData.countInStock} onChange={handleInputChange} required />
          </div>

          <InputField icon={Tag} name="category" placeholder="Category (e.g. Lifestyle, Tech)" value={formData.category} onChange={handleInputChange} required />
          
          <InputField icon={ImageIcon} name="image" placeholder="Main Image URL" value={formData.image} onChange={handleInputChange} required />
          
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-400 px-2">Optional Details (comma separated)</p>
            <InputField icon={Plus} name="images" placeholder="Extra images: url1, url2" value={formData.images} onChange={handleInputChange} />
            <InputField icon={Plus} name="sizes" placeholder="Sizes: S, M, L, XL" value={formData.sizes} onChange={handleInputChange} />
            <InputField icon={Plus} name="colors" placeholder="Colors: Black, White, Silver" value={formData.colors} onChange={handleInputChange} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (
              <>
                <Plus size={20} />
                Add Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;