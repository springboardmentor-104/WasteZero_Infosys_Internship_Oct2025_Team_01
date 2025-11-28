const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

exports.applyToOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const opp = await Opportunity.findById(opportunityId);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    const existing = await Application.findOne({ opportunity: opportunityId, volunteer: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already applied' });
    const app = new Application({ opportunity: opportunityId, volunteer: req.user._id });
    await app.save();
    res.status(201).json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listApplications = async (req, res) => {
  try {
    // Admins see all; NGOs see their opps; volunteers see their own
    if (req.user.role === 'admin') {
      const all = await Application.find().populate('opportunity volunteer');
      return res.json(all);
    }
    if (req.user.role === 'ngo') {
      // find opps by this ngo
      const opps = await Opportunity.find({ ngo: req.user._id }).select('_id');
      const al = await Application.find({ opportunity: { $in: opps } }).populate('opportunity volunteer');
      return res.json(al);
    }
    const mine = await Application.find({ volunteer: req.user._id }).populate('opportunity volunteer');
    res.json(mine);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    // only NGO who owns opportunity or admin can update
    const opp = await Opportunity.findById(app.opportunity);
    if (String(opp.ngo) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
    app.status = req.body.status || app.status;
    await app.save();
    res.json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
