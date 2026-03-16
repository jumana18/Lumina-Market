import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { createServer as createViteServer } from 'vite';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import { protect, admin } from './middleware/authMiddleware.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();   

connectDB();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Auth Routes
  app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });

  app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });

  // Product Routes
  app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  });

  app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });

  // Order Routes
  app.post('/api/orders', protect, async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  });

  app.get('/api/orders/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  });

  // Seed Products
  const seedProducts = async () => {
    const count = await Product.countDocuments();

    if (count === 0) {
      const products = [
        { name: 'Minimalist Desk Lamp', description: 'Elegant LED lamp with adjustable brightness.', price: 89.99, category: 'Lighting', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800', countInStock: 10 },
        { name: 'Ceramic Coffee Set', description: 'Hand-crafted ceramic set.', price: 64.00, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1517256011271-101ad9d8b5c8?auto=format&fit=crop&q=80&w=800', countInStock: 7 },
        { name: 'Leather Travel Journal', description: 'Premium leather journal.', price: 45.50, category: 'Stationery', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', countInStock: 15 },
        { name: 'Wireless Bamboo Speaker', description: 'Eco-friendly Bluetooth speaker.', price: 120.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800', countInStock: 5 }
      ];

      await Product.insertMany(products);
      console.log('Products seeded');
    }
  };

  seedProducts();

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.join(process.cwd(), 'frontend')
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();