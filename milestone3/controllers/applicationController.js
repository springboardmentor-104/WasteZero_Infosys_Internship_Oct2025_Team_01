const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

// VOLUNTEER → Apply for an opportunity
const applyForOpportunity = async (req, res) => {
  try {
    const volunteerId = req.userId;
    const { opportunity_id, message } = req.body;

    const opp = await Opportunity.findById(opportunity_id);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });

    const existing = await Application.findOne({ volunteer_id: volunteerId, opportunity_id });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied' });
    }

    const app = await Application.create({
      volunteer_id: volunteerId,
      opportunity_id,
      ngo_id: opp.ngo_id,
      message,
      status: 'applied'
    });

    res.status(201).json({ message: 'Application submitted', application: app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error applying for opportunity' });
  }
};

// VOLUNTEER → View their own applications
const getMyApplications = async (req, res) => {
  try {
    const volunteerId = req.userId;

    const apps = await Application.find({ volunteer_id: volunteerId })
      .populate('opportunity_id')
      .populate('ngo_id', 'name email');

    res.json({ applications: apps });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

// NGO → View all applications for their opportunities
const getApplicationsForNGO = async (req, res) => {
  try {
    const ngoId = req.userId;

    const apps = await Application.find({ ngo_id: ngoId })
      .populate('opportunity_id')
      .populate('volunteer_id', 'name email skills');

    res.json({ applications: apps });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching NGO applications' });
  }
};

// NGO → Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const ngoId = req.userId;
    const { application_id } = req.params;
    const { status } = req.body; // accepted / rejected / reviewed

    const app = await Application.findById(application_id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    // Check if this application belongs to this NGO
    if (String(app.ngo_id) !== String(ngoId)) {
      return res.status(403).json({ message: 'Forbidden: not your application' });
    }

    app.status = status;
    await app.save();

    res.json({ message: 'Application status updated', application: app });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

module.exports = {
  applyForOpportunity,
  getMyApplications,
  getApplicationsForNGO,
  updateApplicationStatus
};
