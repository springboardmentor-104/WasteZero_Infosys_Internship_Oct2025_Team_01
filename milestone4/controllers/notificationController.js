const Notification = require('../models/Notification');

const getMyNotifications = async (req, res) => {
  const userId = req.userId;
  
  const notifications = await Notification.find({ user_id: userId }).sort({ createdAt: -1 });

  res.json({ notifications });
};

const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { is_read: true });
  res.json({ message: "Notification marked as read" });
};

module.exports = { getMyNotifications, markAsRead };
