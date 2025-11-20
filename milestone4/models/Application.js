const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  volunteer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity_id: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  ngo_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  status: { 
    type: String,
    enum: ['applied', 'reviewed', 'accepted', 'rejected'],
    default: 'applied'
  }
}, { timestamps: true });

applicationSchema.index({ volunteer_id: 1, opportunity_id: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
