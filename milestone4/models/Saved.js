const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  volunteer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  opportunity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }
}, { timestamps: true });

savedSchema.index({ volunteer_id: 1, opportunity_id: 1 }, { unique: true });

module.exports = mongoose.model('Saved', savedSchema);
