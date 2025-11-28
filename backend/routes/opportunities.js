const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOpportunity, updateOpportunity, deleteOpportunity, listOpportunities, getOpportunity } = require('../controllers/opportunityController');

router.post('/', auth, createOpportunity);
router.get('/', listOpportunities);
router.get('/:id', getOpportunity);
router.put('/:id', auth, updateOpportunity);
router.delete('/:id', auth, deleteOpportunity);

module.exports = router;
