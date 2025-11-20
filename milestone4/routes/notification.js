const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getMyNotifications, markAsRead } = require('../controllers/notificationController');

router.get('/', verifyToken, getMyNotifications);
router.put('/:id', verifyToken, markAsRead);

module.exports = router;
