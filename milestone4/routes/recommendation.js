const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const { getRecommendedOpportunities } = require('../controllers/recommendationController');

// VOLUNTEER ONLY
router.get('/', verifyToken, requireRole('volunteer'), getRecommendedOpportunities);

module.exports = router;
