import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { opportunityAPI, applicationAPI } from '../services/api';

const OpportunityDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      const response = await opportunityAPI.getById(id);
      setOpportunity(response.data);
    } catch (error) {
      console.error('Error fetching opportunity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (user?.role !== 'volunteer') {
      setMessage('Only volunteers can apply for opportunities');
      return;
    }

    setApplying(true);
    setMessage('');

    try {
      await applicationAPI.apply({ opportunity_id: id });
      setMessage('Application submitted successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!opportunity) return <div className="container">Opportunity not found</div>;

  const isOwner = user?.role === 'NGO' && opportunity.ngo_id?._id === user.id;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link to="/opportunities" style={{ color: '#4CAF50', textDecoration: 'none' }}>← Back to Opportunities</Link>
      
      <div className="card" style={{ marginTop: '20px' }}>
        <h1>{opportunity.title}</h1>
        <div style={{ marginTop: '15px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '5px 10px',
            background: opportunity.status === 'open' ? '#4CAF50' : opportunity.status === 'in-progress' ? '#FF9800' : '#999',
            color: 'white',
            borderRadius: '5px'
          }}>
            {opportunity.status}
          </span>
          {opportunity.waste_type && (
            <span style={{ padding: '5px 10px', background: '#f0f0f0', borderRadius: '5px' }}>
              {opportunity.waste_type}
            </span>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Description</h3>
          <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{opportunity.description}</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Details</h3>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Location:</strong> {opportunity.location}</p>
            {opportunity.duration && <p><strong>Duration:</strong> {opportunity.duration}</p>}
            {opportunity.required_skills && opportunity.required_skills.length > 0 && (
              <p><strong>Required Skills:</strong> {opportunity.required_skills.join(', ')}</p>
            )}
            {opportunity.applicationCount !== undefined && (
              <p><strong>Applications:</strong> {opportunity.applicationCount}</p>
            )}
          </div>
        </div>

        {opportunity.ngo_id && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
            <h3>Posted by</h3>
            <p><strong>{opportunity.ngo_id.name}</strong></p>
            {opportunity.ngo_id.location && <p>Location: {opportunity.ngo_id.location}</p>}
          </div>
        )}

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            background: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            borderRadius: '5px'
          }}>
            {message}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          {user?.role === 'volunteer' && opportunity.status === 'open' && (
            <button
              onClick={handleApply}
              className="btn btn-primary"
              disabled={applying}
            >
              {applying ? 'Applying...' : 'Apply for this Opportunity'}
            </button>
          )}
          {isOwner && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to={`/opportunity/${id}/edit`} className="btn btn-secondary">Edit</Link>
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this opportunity?')) {
                    try {
                      await opportunityAPI.delete(id);
                      navigate('/opportunities');
                    } catch (error) {
                      setMessage('Failed to delete opportunity');
                    }
                  }
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;

