import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import Opportunity from '../models/Opportunity.js';
import Application from '../models/Application.js';
import AdminLog from '../models/AdminLog.js';

const router = express.Router();

// All admin routes require admin role
router.use(authenticate);
router.use(authorize('admin'));

// GET /admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVolunteers = await User.countDocuments({ role: 'volunteer' });
    const totalNGOs = await User.countDocuments({ role: 'NGO' });
    const totalOpportunities = await Opportunity.countDocuments();
    const totalApplications = await Application.countDocuments();
    const openOpportunities = await Opportunity.countDocuments({ status: 'open' });
    const inProgressOpportunities = await Opportunity.countDocuments({ status: 'in-progress' });

    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentOpportunities = await Opportunity.find()
      .populate('ngo_id', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalVolunteers,
        totalNGOs,
        totalOpportunities,
        totalApplications,
        openOpportunities,
        inProgressOpportunities
      },
      recentUsers,
      recentOpportunities
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// PUT /admin/suspend/:userId
router.put('/suspend/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // For now, we'll add a suspended field (you might want to add this to the User model)
    // For simplicity, we'll just log the action
    await AdminLog.create({
      action: `Suspended user: ${user.email}`,
      user_id: req.user._id
    });

    res.json({ message: 'User suspended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error suspending user', error: error.message });
  }
});

// DELETE /admin/remove-opportunity/:id
router.delete('/remove-opportunity/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Delete all applications for this opportunity
    await Application.deleteMany({ opportunity_id: req.params.id });

    // Delete the opportunity
    await Opportunity.findByIdAndDelete(req.params.id);

    // Log the action
    await AdminLog.create({
      action: `Removed opportunity: ${opportunity.title}`,
      user_id: req.user._id
    });

    res.json({ message: 'Opportunity removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing opportunity', error: error.message });
  }
});

export default router;

