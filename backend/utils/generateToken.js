import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'lumina-market-secret-key-123', {
    expiresIn: '30d',
  });
};

export default generateToken;