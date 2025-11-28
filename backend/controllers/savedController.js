const Saved = require('../models/Saved');

exports.saveOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const existing = await Saved.findOne({ user: req.user._id, opportunity: opportunityId });
    if (existing) return res.status(400).json({ message: 'Already saved' });
    const s = new Saved({ user: req.user._id, opportunity: opportunityId });
    await s.save();
    res.status(201).json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listSaved = async (req, res) => {
  try {
    const list = await Saved.find({ user: req.user._id }).populate('opportunity');
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.removeSaved = async (req, res) => {
  try {
    const s = await Saved.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    if (String(s.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    await s.remove();
    res.json({ message: 'Removed' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
