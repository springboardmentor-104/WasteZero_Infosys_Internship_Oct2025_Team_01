const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.use(auth, isAdmin);

router.get('/users', adminController.listUsers);
router.put('/users/:id/suspend', adminController.suspendUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/analytics', adminController.analytics);
router.get('/logs', adminController.getLogs);
router.get('/reports/users', adminController.exportUsersCSV);

module.exports = router;
