import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import { setUser } from '../utils/auth';

const Profile = ({ user, setUser: setUserState }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    skills: user?.skills?.join(', ') || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updateData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
      };
      const response = await userAPI.update(updateData);
      const updatedUser = { ...user, ...response.data.user };
      setUser(updatedUser);
      setUserState(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          My Profile
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Manage your personal information and preferences
        </p>
      </div>

      <div style={{ maxWidth: '700px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {message && (
            <div style={{
              padding: '15px',
              background: message.includes('success') ? '#E8F5E9' : '#FFEBEE',
              color: message.includes('success') ? '#2E7D32' : '#C62828',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px' }}>{message.includes('success') ? '✓' : '✕'}</span>
              <span>{message}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#f5f5f5',
                  color: '#666'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Role
              </label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#f5f5f5',
                  color: '#666',
                  textTransform: 'capitalize'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., recycling, composting, waste management"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about yourself..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#45a049';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#4CAF50';
              }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

