import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getProducts);

// POST add product (vendor only)
router.post('/', protect, addProduct);

export default router;