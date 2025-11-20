const Saved = require('../models/Saved');

const saveOpportunity = async (req, res) => {
  try {
    const volunteerId = req.userId;
    const { opportunity_id } = req.body;

    const saved = await Saved.create({ volunteer_id: volunteerId, opportunity_id });
    res.json({ message: "Opportunity saved", saved });
  } catch (err) {
    res.status(400).json({ message: "Already saved" });
  }
};

const getSaved = async (req, res) => {
  const items = await Saved.find({ volunteer_id: req.userId }).populate('opportunity_id');
  res.json({ saved: items });
};

module.exports = { saveOpportunity, getSaved };
