const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendMessage, getConversation, getUserConversations } = require('../controllers/messageController');

router.post('/', auth, sendMessage);
router.get('/conversation/:userId', auth, getConversation); // conversation between req.user and userId
router.get('/conversations', auth, getUserConversations); // list conversations

module.exports = router;
