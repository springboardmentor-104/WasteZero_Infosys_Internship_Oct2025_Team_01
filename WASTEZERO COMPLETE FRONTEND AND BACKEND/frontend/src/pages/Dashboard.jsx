import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { opportunityAPI, applicationAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('volunteer');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [oppsRes, appsRes] = await Promise.all([
        opportunityAPI.getAll(),
        applicationAPI.getMyApplications()
      ]);
      setOpportunities(oppsRes.data.slice(0, 3));
      setApplications(appsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalWeight = applications.length * 70; // Demo calculation
  const carbonOffset = (totalWeight / 1000 * 2).toFixed(1);
  const pickupsCompleted = applications.filter(app => app.status === 'accepted').length || 18;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'open':
        return '#4CAF50';
      case 'full':
        return '#FF9800';
      case 'in-progress':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#1B5E20', marginBottom: '5px' }}>Dashboard</h1>
        <p style={{ margin: 0, color: '#388E3C', fontSize: '16px', fontWeight: '500' }}>Welcome, Volunteer!</p>
      </div>

      {/* View Toggle */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '5px',
        borderRadius: '8px',
        width: 'fit-content',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setViewMode('volunteer')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: viewMode === 'volunteer' ? '#4CAF50' : 'transparent',
            color: viewMode === 'volunteer' ? 'white' : '#666',
            fontWeight: viewMode === 'volunteer' ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}
        >
          Volunteer View
        </button>
        <button
          onClick={() => setViewMode('admin')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: viewMode === 'admin' ? '#4CAF50' : 'transparent',
            color: viewMode === 'admin' ? 'white' : '#666',
            fontWeight: viewMode === 'admin' ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}
        >
          Admin View
        </button>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {/* Total Weight Recycled */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          borderLeft: '4px solid #2E7D32'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#C8E6C9',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            ♻️
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B5E20', marginBottom: '5px' }}>
              {totalWeight.toLocaleString()} kg
            </div>
            <div style={{ color: '#388E3C', fontSize: '14px', fontWeight: '500' }}>This month</div>
          </div>
        </div>

        {/* Carbon Offset */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          borderLeft: '4px solid #1976D2'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#BBDEFB',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            📊
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0D47A1', marginBottom: '5px' }}>
              {carbonOffset} Tons
            </div>
            <div style={{ color: '#1976D2', fontSize: '14px', fontWeight: '500' }}>Equivalent to 12 trees</div>
          </div>
        </div>

        {/* Pickups Completed */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          borderLeft: '4px solid #F57C00'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#FFE0B2',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#E65100', marginBottom: '5px' }}>
              {pickupsCompleted}
            </div>
            <div style={{ color: '#F57C00', fontSize: '14px', fontWeight: '500' }}>Since joining</div>
          </div>
        </div>
      </div>

      {/* Suggested Opportunities */}
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#1B5E20', marginBottom: '5px' }}>
            Suggested Opportunities
          </h2>
          <p style={{ margin: 0, color: '#388E3C', fontSize: '14px', fontWeight: '500' }}>
            Find new ways to make an impact.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '20px' 
        }}>
          {opportunities.length > 0 ? (
            opportunities.map(opp => (
              <div
                key={opp._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onClick={() => window.location.href = `/opportunity/${opp._id}`}
              >
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  fontSize: '24px'
                }}>
                  🌱
                </div>
                <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#333', marginBottom: '10px' }}>
                    {opp.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      {opp.waste_type || 'General'}
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: getStatusColor(opp.status) === '#4CAF50' ? '#E8F5E9' : '#FFF3E0',
                      color: getStatusColor(opp.status),
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {opp.status || 'Active'}
                    </span>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    color: '#666', 
                    fontSize: '14px', 
                    lineHeight: '1.5',
                    marginBottom: '15px'
                  }}>
                    {opp.description?.substring(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                      <span>📍</span>
                      <span>{opp.location || 'Location TBD'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                      <span>📅</span>
                      <span>{formatDate(opp.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              color: '#666'
            }}>
              No opportunities available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

