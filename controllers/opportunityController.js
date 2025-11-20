const Opportunity = require('../models/Opportunity');
const { validationResult } = require('express-validator');

// Create (NGO only)
const createOpportunity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const ngoId = req.userId; // from verifyToken
    const payload = {
      ngo_id: ngoId,
      title: req.body.title,
      description: req.body.description,
      required_skills: req.body.required_skills || [],
      duration: req.body.duration,
      location: req.body.location,
      status: req.body.status || 'open'
    };

    const opp = await Opportunity.create(payload);
    res.status(201).json({ message: 'Opportunity created', opportunity: opp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating opportunity' });
  }
};

// List with optional filters & pagination
const listOpportunities = async (req, res) => {
  try {
    const { page = 1, limit = 20, location, status, skill } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (status) filter.status = status;
    if (skill) filter.required_skills = { $in: [skill] };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Opportunity.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('ngo_id', 'name email'),
      Opportunity.countDocuments(filter)
    ]);
    res.json({ page: Number(page), limit: Number(limit), total, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error listing opportunities' });
  }
};

// Get single
const getOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id).populate('ngo_id', 'name email');
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    res.json(opp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching opportunity' });
  }
};

// Update (only NGO who created it or admin)
const updateOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });

    // only owner NGO or admin can update
    if (String(opp.ngo_id) !== String(req.userId) && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: only owner NGO or admin can update' });
    }

    // update allowed fields
    const allowed = ['title','description','required_skills','duration','location','status'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) opp[field] = req.body[field];
    });

    await opp.save();
    res.json({ message: 'Opportunity updated', opportunity: opp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating opportunity' });
  }
};

// Delete (only owner NGO or admin)
const deleteOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });

    if (String(opp.ngo_id) !== String(req.userId) && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: only owner NGO or admin can delete' });
    }

    await opp.remove();
    res.json({ message: 'Opportunity deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting opportunity' });
  }
};

module.exports = {
  createOpportunity,
  listOpportunities,
  getOpportunity,
  updateOpportunity,
  deleteOpportunity
};
