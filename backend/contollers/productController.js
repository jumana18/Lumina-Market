import { getDb } from '../config/db.js';

// ✅ GET products (only approved)
export const getProducts = async (req, res) => {
  try {
    const db = getDb();

    const products = db
      .prepare("SELECT * FROM products WHERE approved = 1")
      .all();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD product (vendor)
export const addProduct = async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can add products' });
    }

    const {
      name,
      image,
      images,
      description,
      category,
      price,
      countInStock,
      sizes,
      colors,
    } = req.body;

    const db = getDb();

    const result = db.prepare(
      `INSERT INTO products
       (name, image, images, description, category, price, countInStock, sizes, colors, user_id, approved)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      name,
      image,
      JSON.stringify(images || []),
      description,
      category,
      price,
      countInStock,
      JSON.stringify(sizes || []),
      JSON.stringify(colors || []),
      req.user.id,
      0
    );

    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};