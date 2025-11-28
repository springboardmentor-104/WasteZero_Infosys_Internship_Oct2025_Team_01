const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetOpportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' },
  details: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('AdminLog', adminLogSchema);
