import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
