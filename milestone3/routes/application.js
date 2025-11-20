const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const {
  applyForOpportunity,
  getMyApplications,
  getApplicationsForNGO,
  updateApplicationStatus
} = require('../controllers/applicationController');

// VOLUNTEER → Apply
router.post('/', verifyToken, requireRole('volunteer'), applyForOpportunity);

// VOLUNTEER → My applications
router.get('/mine', verifyToken, requireRole('volunteer'), getMyApplications);

// NGO → Applications for their opportunities
router.get('/ngo', verifyToken, requireRole('ngo'), getApplicationsForNGO);

// NGO → Update application status
router.put('/:application_id', verifyToken, requireRole('ngo'), updateApplicationStatus);

module.exports = router;
