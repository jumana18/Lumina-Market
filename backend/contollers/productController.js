import { getDb } from '../config/db.js';

// Get all products
// GET /api/products
export const getProducts = async (req, res) => {
  const db = getDb();
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
};