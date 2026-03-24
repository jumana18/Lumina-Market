import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { createServer as createViteServer } from 'vite';

import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import { protect, admin } from './middleware/authMiddleware.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function startServer() {
  let dbConnected = false;
  let dbError = null;

  await connectDB()
    .then(() => {
      dbConnected = true;
      console.log('MongoDB connected');
    })
    .catch((err) => {
      dbError = err.message;
      console.error('DB Error:', err.message);
    });

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  app.use('/api', (req, res, next) => {
    if (!dbConnected && !req.path.includes('/health')) {
      return res.status(503).json({ message: 'DB not connected', dbError });
    }
    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', dbConnected });
  });

  // USERS
  app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: { id: user._id, name: user.name, email: user.email },
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
    });
  });

  // PRODUCTS
  app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) res.json(product);
      else res.status(404).json({ message: 'Product not found' });
    } catch {
      res.status(404).json({ message: 'Invalid ID' });
    }
  });

  app.post('/api/products', protect, admin, async (req, res) => {
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
  });

  // ORDERS
  app.post('/api/orders', protect, async (req, res) => {
    const order = new Order({ ...req.body, user: req.user._id });
    const created = await order.save();
    res.status(201).json(created);
  });

  // START SERVER
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // VITE
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.join(process.cwd(), 'frontend'),
    });
    app.use(vite.middlewares);
  }
}

startServer();