const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    if (user.isSuspended) return res.status(403).json({ message: 'User suspended' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token error' });
  }
};

module.exports = auth;
