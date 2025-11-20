const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const { saveOpportunity, getSaved } = require('../controllers/savedController');

router.post('/', verifyToken, requireRole('volunteer'), saveOpportunity);
router.get('/', verifyToken, requireRole('volunteer'), getSaved);

module.exports = router;
