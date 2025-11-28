const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { applyToOpportunity, listApplications, updateApplication } = require('../controllers/applicationController');

router.post('/:opportunityId', auth, applyToOpportunity);
router.get('/', auth, listApplications); // admin/ngo can list
router.put('/:id', auth, updateApplication);

module.exports = router;
