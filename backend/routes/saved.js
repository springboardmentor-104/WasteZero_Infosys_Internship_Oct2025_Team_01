const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveOpportunity, listSaved, removeSaved } = require('../controllers/savedController');

router.post('/:opportunityId', auth, saveOpportunity);
router.get('/', auth, listSaved);
router.delete('/:id', auth, removeSaved);

module.exports = router;
