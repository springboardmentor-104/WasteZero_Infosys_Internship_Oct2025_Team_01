const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMatches } = require('../controllers/recommendationController');

router.get('/matches/:volunteerId', auth, getMatches);

module.exports = router;
