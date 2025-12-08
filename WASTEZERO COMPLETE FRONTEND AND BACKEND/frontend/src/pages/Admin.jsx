import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const Admin = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendUser = async (userId) => {
    if (!window.confirm('Are you sure you want to suspend this user?')) return;

    try {
      await adminAPI.suspendUser(userId);
      setMessage('User suspended successfully');
      fetchDashboard();
    } catch (error) {
      setMessage('Failed to suspend user');
    }
  };

  const handleRemoveOpportunity = async (id) => {
    if (!window.confirm('Are you sure you want to remove this opportunity?')) return;

    try {
      await adminAPI.removeOpportunity(id);
      setMessage('Opportunity removed successfully');
      fetchDashboard();
    } catch (error) {
      setMessage('Failed to remove opportunity');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {message && (
        <div style={{
          padding: '10px',
          background: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      {dashboardData && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div className="card">
              <h3>Total Users</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                {dashboardData.stats.totalUsers}
              </p>
            </div>
            <div className="card">
              <h3>Volunteers</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>
                {dashboardData.stats.totalVolunteers}
              </p>
            </div>
            <div className="card">
              <h3>NGOs</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9800' }}>
                {dashboardData.stats.totalNGOs}
              </p>
            </div>
            <div className="card">
              <h3>Opportunities</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#9C27B0' }}>
                {dashboardData.stats.totalOpportunities}
              </p>
            </div>
            <div className="card">
              <h3>Applications</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#F44336' }}>
                {dashboardData.stats.totalApplications}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="card">
              <h3>Recent Users</h3>
              {dashboardData.recentUsers.map(u => (
                <div key={u._id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <strong>{u.name}</strong> ({u.email})
                  <span style={{ marginLeft: '10px', padding: '3px 8px', background: '#f0f0f0', borderRadius: '3px', fontSize: '12px' }}>
                    {u.role}
                  </span>
                  <button
                    onClick={() => handleSuspendUser(u._id)}
                    className="btn btn-danger"
                    style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '12px' }}
                  >
                    Suspend
                  </button>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>Recent Opportunities</h3>
              {dashboardData.recentOpportunities.map(opp => (
                <div key={opp._id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <strong>{opp.title}</strong>
                  <p style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                    by {opp.ngo_id?.name}
                  </p>
                  <button
                    onClick={() => handleRemoveOpportunity(opp._id)}
                    className="btn btn-danger"
                    style={{ marginTop: '5px', padding: '5px 10px', fontSize: '12px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;

