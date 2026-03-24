import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Star, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setActiveImage(data.image);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      ...product, 
      quantity, 
      selectedSize, 
      selectedColor 
    }));
    navigate('/cart');
  };

  if (loading) return <div className="pt-32 text-center text-primary font-bold">Loading...</div>;
  if (!product) return <div className="pt-32 text-center text-red-500 font-bold">Product not found.</div>;

  const allImages = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
        <ArrowLeft className="w-4 h-4" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl bg-secondary/30"
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">{product.category}</span>
            <h1 className="text-5xl font-serif font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">(48 Customer Reviews)</span>
            </div>
            <p className="text-4xl font-bold text-white">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-xl text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-8">
            {product.colors?.length > 0 && (
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${selectedColor === color ? 'border-primary bg-primary text-black' : 'border-white/10 hover:border-white/30'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary text-black' : 'border-white/10 hover:border-white/30'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">-</button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-5 bg-primary text-white font-bold rounded-full hover:bg-accent transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">30 Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
