const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Attach full user object (optional, helpful for controllers)
const attachUser = async (req, res, next) => {
  try {
    if (!req.userId) return next();
    const user = await User.findById(req.userId).select('-password');
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.userRole) return res.status(403).json({ message: 'Role not found' });
  if (!roles.includes(req.userRole)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
};

module.exports = { verifyToken, requireRole, attachUser };
