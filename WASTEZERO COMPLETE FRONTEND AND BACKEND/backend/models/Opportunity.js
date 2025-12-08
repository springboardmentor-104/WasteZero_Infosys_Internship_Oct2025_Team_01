import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  required_skills: {
    type: [String],
    default: []
  },
  duration: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'in-progress'],
    default: 'open'
  },
  waste_type: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;

