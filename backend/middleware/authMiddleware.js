require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRole) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== requiredRole) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
