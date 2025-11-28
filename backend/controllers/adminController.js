const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Message = require('../models/Message');
const AdminLog = require('../models/AdminLog');
const { exportToCSV } = require('../utils/csvExport');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.suspendUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  user.isSuspended = true;
  await user.save();
  await AdminLog.create({ action: 'suspend_user', admin: req.user._id, targetUser: user._id });
  res.json({ message: 'User suspended' });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  await user.remove();
  await AdminLog.create({ action: 'delete_user', admin: req.user._id, targetUser: user._id });
  res.json({ message: 'Deleted' });
};

exports.analytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOpportunities = await Opportunity.countDocuments();
  const totalApplications = await Application.countDocuments();
  const totalMessages = await Message.countDocuments();
  // active users (last 30 days)
  const thirty = new Date(); thirty.setDate(thirty.getDate() - 30);
  const activeUsers = await User.countDocuments({ updatedAt: { $gte: thirty } });

  res.json({ totalUsers, totalOpportunities, totalApplications, totalMessages, activeUsers });
};

exports.getLogs = async (req, res) => {
  const logs = await AdminLog.find().populate('admin targetUser targetOpportunity');
  res.json(logs);
};

exports.exportUsersCSV = async (req, res) => {
  const users = await User.find().select('name email role createdAt');
  const path = await exportToCSV(users.map(u => u.toObject()), ['name','email','role','createdAt'], 'users_report');
  res.download(path);
};
