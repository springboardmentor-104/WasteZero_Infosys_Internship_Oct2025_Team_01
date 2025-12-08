import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Application from '../models/Application.js';
import Opportunity from '../models/Opportunity.js';

const router = express.Router();

// POST /applications/apply
router.post('/apply', authenticate, authorize('volunteer'), async (req, res) => {
  try {
    const { opportunity_id } = req.body;

    // Check if opportunity exists
    const opportunity = await Opportunity.findById(opportunity_id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      opportunity_id,
      volunteer_id: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this opportunity' });
    }

    // Create application
    const application = new Application({
      opportunity_id,
      volunteer_id: req.user._id,
      status: 'pending'
    });

    await application.save();
    
    const populatedApplication = await Application.findById(application._id)
      .populate('opportunity_id', 'title description location')
      .populate('volunteer_id', 'name email');

    res.status(201).json({ message: 'Application submitted successfully', application: populatedApplication });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// GET /applications/my-applications
router.get('/my-applications', authenticate, async (req, res) => {
  try {
    let applications;

    if (req.user.role === 'volunteer') {
      // Get applications by volunteer
      applications = await Application.find({ volunteer_id: req.user._id })
        .populate('opportunity_id', 'title description location status waste_type')
        .populate('volunteer_id', 'name email')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'NGO') {
      // Get applications for NGO's opportunities
      const opportunities = await Opportunity.find({ ngo_id: req.user._id });
      const opportunityIds = opportunities.map(opp => opp._id);
      
      applications = await Application.find({ opportunity_id: { $in: opportunityIds } })
        .populate('opportunity_id', 'title description location status waste_type')
        .populate('volunteer_id', 'name email skills location')
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

export default router;
