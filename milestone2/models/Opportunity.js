const mongoose = require('mongoose');
const { Schema } = mongoose;

const opportunitySchema = new Schema({
  ngo_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  required_skills: [String],
  duration: { type: String },
  location: { type: String, required: true, index: true },
  status: { type: String, enum: ['open','closed','in-progress'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
