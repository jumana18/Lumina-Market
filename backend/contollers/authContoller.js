import bcrypt from 'bcryptjs';
import { getDb } from '../config/db.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  const db = getDb();

  try {
    const userExists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
    
    const user = { id: result.lastInsertRowid, name, email };
    res.status(201).json({
      user,
      token: generateToken(Number(result.lastInsertRowid)),
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const db = getDb();

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
export const getMe = async (req: any, res: any) => {
  res.json({ user: req.user });
};
