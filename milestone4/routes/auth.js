const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');

/**
 * POST /api/auth/signup
 * body: { name, email, password, role(optional: volunteer|ngo), skills, location, bio }
 */
router.post('/signup', [
  body('name').isLength({ min: 2 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').optional().isIn(['volunteer','ngo','admin'])
], signup);

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required')
], login);

module.exports = router;

