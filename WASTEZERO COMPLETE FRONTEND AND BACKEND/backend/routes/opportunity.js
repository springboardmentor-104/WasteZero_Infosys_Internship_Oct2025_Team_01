import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Opportunity from '../models/Opportunity.js';
import Application from '../models/Application.js';

const router = express.Router();

// POST /opportunity/create
router.post('/create', authenticate, authorize('NGO'), async (req, res) => {
  try {
    const { title, description, required_skills, duration, location, waste_type } = req.body;

    const opportunity = new Opportunity({
      ngo_id: req.user._id,
      title,
      description,
      required_skills: required_skills || [],
      duration: duration || '',
      location,
      waste_type: waste_type || '',
      status: 'open'
    });

    await opportunity.save();
    res.status(201).json({ message: 'Opportunity created successfully', opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Error creating opportunity', error: error.message });
  }
});

// GET /opportunity/all
router.get('/all', authenticate, async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('ngo_id', 'name email location')
      .sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
  }
});

// GET /opportunity/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('ngo_id', 'name email location bio');
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Get application count
    const applicationCount = await Application.countDocuments({
      opportunity_id: req.params.id
    });

    res.json({ ...opportunity.toObject(), applicationCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunity', error: error.message });
  }
});

// PUT /opportunity/update/:id
router.put('/update/:id', authenticate, authorize('NGO'), async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.ngo_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this opportunity' });
    }

    const { title, description, required_skills, duration, location, status, waste_type } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (required_skills) updateData.required_skills = required_skills;
    if (duration) updateData.duration = duration;
    if (location) updateData.location = location;
    if (status) updateData.status = status;
    if (waste_type) updateData.waste_type = waste_type;

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Opportunity updated successfully', opportunity: updatedOpportunity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating opportunity', error: error.message });
  }
});

// DELETE /opportunity/delete/:id
router.delete('/delete/:id', authenticate, authorize('NGO', 'admin'), async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check if user is admin or the owner
    if (req.user.role !== 'admin' && opportunity.ngo_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this opportunity' });
    }

    // Delete all applications for this opportunity
    await Application.deleteMany({ opportunity_id: req.params.id });
    
    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting opportunity', error: error.message });
  }
});

export default router;
