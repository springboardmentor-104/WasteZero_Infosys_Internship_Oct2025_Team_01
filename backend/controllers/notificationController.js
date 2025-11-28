const Notification = require('../models/Notification');

exports.listNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user._id }).sort('-createdAt');
    res.json(notes);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.markRead = async (req, res) => {
  try {
    const note = await Notification.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (String(note.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    note.isRead = true;
    await note.save();
    res.json(note);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
