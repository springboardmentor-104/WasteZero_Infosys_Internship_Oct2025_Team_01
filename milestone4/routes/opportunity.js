const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createOpportunity, listOpportunities, getOpportunity, updateOpportunity, deleteOpportunity
} = require('../controllers/opportunityController');

const { verifyToken, requireRole, attachUser } = require('../middleware/auth');

// Public listing and read
router.get('/', listOpportunities);
router.get('/:id', getOpportunity);

// Protected routes (NGO only to create)
router.post(
  '/',
  verifyToken,
  attachUser,
  requireRole('ngo'),
  [
    body('title').isLength({ min: 3 }).withMessage('Title required'),
    body('location').notEmpty().withMessage('Location required')
  ],
  createOpportunity
);

// Update and Delete: verifyToken and attachUser are required
router.put('/:id', verifyToken, attachUser, updateOpportunity);
router.delete('/:id', verifyToken, attachUser, deleteOpportunity);

module.exports = router;
