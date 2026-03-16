import { getDb } from '../config/db.js';
import bcrypt from 'bcryptjs';

// @desc    Update user profile
// @route   PUT /api/users/profile
export const updateUserProfile = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  const db = getDb();

  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);

    if (user) {
      const updatedName = name || user.name;
      const updatedEmail = email || user.email;
      let updatedPassword = user.password;

      if (password) {
        updatedPassword = await bcrypt.hash(password, 10);
      }

      db.prepare("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?")
        .run(updatedName, updatedEmail, updatedPassword, req.user.id);

      res.json({
        id: req.user.id,
        name: updatedName,
        email: updatedEmail,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};
