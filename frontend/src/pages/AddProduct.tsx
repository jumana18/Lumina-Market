import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Plus, Image as ImageIcon, Tag, DollarSign, List, ArrowLeft, CheckCircle2 } from 'lucide-react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/products', {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        images: formData.images ? formData.images.split(',').map(s => s.trim()) : [],
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
        colors: formData.colors ? formData.colors.split(',').map(s => s.trim()) : []
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product. Please check if you are logged in as admin.');
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
            The new product has been successfully added to the store.
          </p>
          <p className="text-black font-bold">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </Link>
      
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold">Add New Product</h1>
          <p className="text-gray-500 text-lg">Fill in the details below to list a new item in your store.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Package className="w-4 h-4" /> Product Name
              </label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. Minimalist Chair"
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-4 h-4" /> Description
              </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
                rows={4}
                placeholder="Describe the product features and materials..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors resize-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Price ($)
                </label>
                <input 
                  name="price" 
                  type="number" 
                  step="0.01"
                  value={formData.price} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="99.99"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <List className="w-4 h-4" /> Category
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Decor">Decor</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Main Image URL
              </label>
              <input 
                name="image" 
                value={formData.image} 
                onChange={handleInputChange} 
                required 
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Additional Image URLs (comma separated)
              </label>
              <input 
                name="images" 
                value={formData.images} 
                onChange={handleInputChange} 
                placeholder="url1, url2, url3"
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Sizes (comma separated)
                </label>
                <input 
                  name="sizes" 
                  value={formData.sizes} 
                  onChange={handleInputChange} 
                  placeholder="S, M, L, XL"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Colors (comma separated)
                </label>
                <input 
                  name="colors" 
                  value={formData.colors} 
                  onChange={handleInputChange} 
                  placeholder="Red, Blue, Green"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4" /> Stock Quantity
              </label>
              <input 
                name="countInStock" 
                type="number" 
                value={formData.countInStock} 
                onChange={handleInputChange} 
                required 
                placeholder="10"
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:border-black focus:outline-none transition-colors" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Adding Product...' : 'Add Product to Store'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
