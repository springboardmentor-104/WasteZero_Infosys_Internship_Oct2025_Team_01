import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const AdminLog = mongoose.model('AdminLog', adminLogSchema);

export default AdminLog;

