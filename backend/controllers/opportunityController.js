const Opportunity = require('../models/Opportunity');

exports.createOpportunity = async (req, res) => {
  try {
    const { title, description, required_skills, duration, location } = req.body;
    const opp = new Opportunity({
      ngo: req.user._id,
      title, description, required_skills, duration,
      location: location || req.user.location
    });
    await opp.save();
    res.status(201).json(opp);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listOpportunities = async (req, res) => {
  try {
    const ops = await Opportunity.find().populate('ngo','name email');
    res.json(ops);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id).populate('ngo','name email');
    if (!opp) return res.status(404).json({ message: 'Not found' });
    res.json(opp);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Not found' });
    if (String(opp.ngo) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });

    Object.assign(opp, req.body);
    await opp.save();
    res.json(opp);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Not found' });
    if (String(opp.ngo) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
    await opp.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
