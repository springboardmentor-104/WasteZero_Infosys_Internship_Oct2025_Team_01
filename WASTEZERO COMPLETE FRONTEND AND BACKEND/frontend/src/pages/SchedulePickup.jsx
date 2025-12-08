import { useState } from 'react';

const SchedulePickup = ({ user }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    waste_type: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create a pickup request
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        date: '',
        time: '',
        location: '',
        waste_type: '',
        description: ''
      });
    }, 3000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          Pickup Schedule
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Schedule a waste pickup at your location
        </p>
      </div>

      <div style={{ 
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {submitted && (
            <div style={{
              padding: '15px',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px' }}>✓</span>
              <span>Pickup scheduled successfully! We'll contact you soon.</span>
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
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
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
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
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
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your address or location"
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
                Waste Type
              </label>
              <select 
                name="waste_type" 
                value={formData.waste_type} 
                onChange={handleChange} 
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'white',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              >
                <option value="">Select waste type</option>
                <option value="plastic">Plastic</option>
                <option value="organic">Organic</option>
                <option value="electronic">Electronic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333',
                fontSize: '14px'
              }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the waste items, quantity, and any special instructions..."
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
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              Schedule Pickup
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div style={{
          backgroundColor: '#E8F5E9',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          display: 'flex',
          gap: '15px',
          alignItems: 'start'
        }}>
          <div style={{ fontSize: '24px' }}>ℹ️</div>
          <div>
            <h4 style={{ margin: 0, marginBottom: '8px', color: '#2E7D32' }}>
              Pickup Information
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              Our team will review your pickup request and contact you within 24-48 hours to confirm the schedule. 
              Please ensure the waste is properly sorted and ready for collection at the scheduled time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;

