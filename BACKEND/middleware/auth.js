// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Nema tokena' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tajni_kljuc');
    req.user = decoded;
    console.log('AUTH OK ->', decoded); // 👈 debug
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Neispravan token' });
  }
};

module.exports = authMiddleware;
