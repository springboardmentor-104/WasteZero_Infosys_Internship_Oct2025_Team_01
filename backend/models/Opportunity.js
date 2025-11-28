const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  required_skills: [String],
  duration: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  },
  status: { type: String, enum: ['open','closed','in-progress'], default: 'open' }
}, { timestamps: true });

opportunitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Opportunity', opportunitySchema);
