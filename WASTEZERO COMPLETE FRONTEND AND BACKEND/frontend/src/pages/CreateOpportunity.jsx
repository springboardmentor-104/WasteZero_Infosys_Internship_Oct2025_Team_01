import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { opportunityAPI } from '../services/api';

const CreateOpportunity = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    required_skills: '',
    duration: '',
    location: '',
    waste_type: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        required_skills: formData.required_skills
          ? formData.required_skills.split(',').map(s => s.trim())
          : []
      };
      await opportunityAPI.create(submitData);
      navigate('/opportunities');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create opportunity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2>Create Opportunity</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          <div className="form-group">
            <label>Required Skills (comma-separated)</label>
            <input
              type="text"
              name="required_skills"
              value={formData.required_skills}
              onChange={handleChange}
              placeholder="e.g., recycling, composting, waste management"
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 weeks, 1 month"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Waste Type</label>
            <input
              type="text"
              name="waste_type"
              value={formData.waste_type}
              onChange={handleChange}
              placeholder="e.g., plastic, organic, electronic"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Opportunity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOpportunity;

