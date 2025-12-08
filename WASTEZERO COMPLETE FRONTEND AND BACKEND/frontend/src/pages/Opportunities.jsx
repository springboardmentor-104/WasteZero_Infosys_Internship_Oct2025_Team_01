import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { opportunityAPI } from '../services/api';

const Opportunities = ({ user }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await opportunityAPI.getAll();
      const fetchedOpportunities = response.data;
      
      // If no opportunities found, add demo opportunities
      if (fetchedOpportunities.length === 0) {
        const demoOpportunities = [
          {
            _id: 'demo1',
            title: 'Electronics Recycling Drive',
            description: 'Collect old electronics for proper recycling. Help us reduce e-waste and recover valuable materials. We accept computers, phones, tablets, and other electronic devices.',
            location: 'Downtown Community Center',
            waste_type: 'Electronics',
            status: 'open',
            duration: '4 hours',
            required_skills: ['Electronics', 'Recycling', 'Organization'],
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Green Tech Solutions' }
          },
          {
            _id: 'demo2',
            title: 'Beach Cleanup Initiative',
            description: 'Help clean up the coastline and protect marine life. Join us for a day of beach cleaning, sorting recyclables, and learning about ocean conservation.',
            location: 'Sunset Beach',
            waste_type: 'Environmental',
            status: 'open',
            duration: '3 hours',
            required_skills: ['Beach Cleaning', 'Teamwork', 'Environmental Awareness'],
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Ocean Guardians' }
          },
          {
            _id: 'demo3',
            title: 'Paper Recycling Workshop',
            description: 'Learn about paper recycling and create recycled paper crafts. This hands-on workshop teaches sustainable practices and creative upcycling techniques.',
            location: 'Green Library',
            waste_type: 'Education',
            status: 'full',
            duration: '2 hours',
            required_skills: ['Crafting', 'Teaching', 'Recycling'],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Eco Education Hub' }
          },
          {
            _id: 'demo4',
            title: 'Community Garden Composting',
            description: 'Help establish and maintain a community composting system. Learn about organic waste management and contribute to local food production.',
            location: 'City Park Community Garden',
            waste_type: 'Organic',
            status: 'in-progress',
            duration: 'Ongoing',
            required_skills: ['Gardening', 'Composting', 'Community Engagement'],
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Urban Green Initiative' }
          },
          {
            _id: 'demo5',
            title: 'Plastic Bottle Collection Drive',
            description: 'Organize a neighborhood plastic bottle collection drive. Help reduce plastic pollution and raise awareness about single-use plastics.',
            location: 'Various Neighborhoods',
            waste_type: 'Plastic',
            status: 'open',
            duration: '1 week',
            required_skills: ['Organization', 'Community Outreach', 'Recycling'],
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Plastic Free Community' }
          },
          {
            _id: 'demo6',
            title: 'Metal Scrap Collection Event',
            description: 'Collect and sort metal scrap for recycling. Help recover valuable metals and reduce mining impact. All types of metal accepted.',
            location: 'Recycling Center',
            waste_type: 'Metal',
            status: 'open',
            duration: '6 hours',
            required_skills: ['Metal Sorting', 'Heavy Lifting', 'Safety'],
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            ngo_id: { name: 'Metal Recovery Network' }
          }
        ];
        setOpportunities(demoOpportunities);
      } else {
        setOpportunities(fetchedOpportunities);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      // Add demo opportunities on error as well
      const demoOpportunities = [
        {
          _id: 'demo1',
          title: 'Electronics Recycling Drive',
          description: 'Collect old electronics for proper recycling. Help us reduce e-waste and recover valuable materials. We accept computers, phones, tablets, and other electronic devices.',
          location: 'Downtown Community Center',
          waste_type: 'Electronics',
          status: 'open',
          duration: '4 hours',
          required_skills: ['Electronics', 'Recycling', 'Organization'],
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Green Tech Solutions' }
        },
        {
          _id: 'demo2',
          title: 'Beach Cleanup Initiative',
          description: 'Help clean up the coastline and protect marine life. Join us for a day of beach cleaning, sorting recyclables, and learning about ocean conservation.',
          location: 'Sunset Beach',
          waste_type: 'Environmental',
          status: 'open',
          duration: '3 hours',
          required_skills: ['Beach Cleaning', 'Teamwork', 'Environmental Awareness'],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Ocean Guardians' }
        },
        {
          _id: 'demo3',
          title: 'Paper Recycling Workshop',
          description: 'Learn about paper recycling and create recycled paper crafts. This hands-on workshop teaches sustainable practices and creative upcycling techniques.',
          location: 'Green Library',
          waste_type: 'Education',
          status: 'full',
          duration: '2 hours',
          required_skills: ['Crafting', 'Teaching', 'Recycling'],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Eco Education Hub' }
        },
        {
          _id: 'demo4',
          title: 'Community Garden Composting',
          description: 'Help establish and maintain a community composting system. Learn about organic waste management and contribute to local food production.',
          location: 'City Park Community Garden',
          waste_type: 'Organic',
          status: 'in-progress',
          duration: 'Ongoing',
          required_skills: ['Gardening', 'Composting', 'Community Engagement'],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Urban Green Initiative' }
        },
        {
          _id: 'demo5',
          title: 'Plastic Bottle Collection Drive',
          description: 'Organize a neighborhood plastic bottle collection drive. Help reduce plastic pollution and raise awareness about single-use plastics.',
          location: 'Various Neighborhoods',
          waste_type: 'Plastic',
          status: 'open',
          duration: '1 week',
          required_skills: ['Organization', 'Community Outreach', 'Recycling'],
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Plastic Free Community' }
        },
        {
          _id: 'demo6',
          title: 'Metal Scrap Collection Event',
          description: 'Collect and sort metal scrap for recycling. Help recover valuable metals and reduce mining impact. All types of metal accepted.',
          location: 'Recycling Center',
          waste_type: 'Metal',
          status: 'open',
          duration: '6 hours',
          required_skills: ['Metal Sorting', 'Heavy Lifting', 'Safety'],
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          ngo_id: { name: 'Metal Recovery Network' }
        }
      ];
      setOpportunities(demoOpportunities);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredOpportunities = filter === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.status?.toLowerCase() === filter.toLowerCase());

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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
            Eco Opportunities
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
            Discover ways to make a positive environmental impact
          </p>
        </div>
        {user?.role === 'NGO' && (
          <button
            onClick={() => navigate('/create-opportunity')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            + Create Opportunity
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {['all', 'open', 'in-progress', 'full'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: filter === status ? '#4CAF50' : 'white',
              color: filter === status ? 'white' : '#666',
              fontWeight: filter === status ? 'bold' : 'normal',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              textTransform: 'capitalize'
            }}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '60px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌱</div>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>No opportunities found</h3>
          <p style={{ color: '#999' }}>
            {filter === 'all' 
              ? 'No opportunities available at the moment.' 
              : `No ${filter} opportunities available.`}
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '24px' 
        }}>
          {filteredOpportunities.map(opp => (
            <div
              key={opp._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onClick={() => navigate(`/opportunity/${opp._id}`)}
            >
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '24px'
              }}>
                🌱
              </div>
              
              <h3 style={{ 
                margin: 0, 
                fontSize: '20px', 
                color: '#333', 
                marginBottom: '12px',
                paddingRight: '40px'
              }}>
                {opp.title}
              </h3>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                <span style={{
                  padding: '6px 12px',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  {opp.waste_type || 'General'}
                </span>
                <span style={{
                  padding: '6px 12px',
                  backgroundColor: getStatusColor(opp.status) === '#4CAF50' ? '#E8F5E9' : 
                                  getStatusColor(opp.status) === '#FF9800' ? '#FFF3E0' : '#E3F2FD',
                  color: getStatusColor(opp.status),
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {opp.status || 'Active'}
                </span>
              </div>
              
              <p style={{ 
                margin: 0, 
                color: '#666', 
                fontSize: '14px', 
                lineHeight: '1.6',
                marginBottom: '20px',
                minHeight: '60px'
              }}>
                {opp.description?.substring(0, 120)}...
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px',
                paddingTop: '15px',
                borderTop: '1px solid #F0F0F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                  <span>📍</span>
                  <span>{opp.location || 'Location TBD'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                  <span>📅</span>
                  <span>{formatDate(opp.createdAt)}</span>
                </div>
                {opp.duration && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                    <span>⏱️</span>
                    <span>{opp.duration}</span>
                  </div>
                )}
                {opp.required_skills && opp.required_skills.length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Skills Required:</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {opp.required_skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#E8F5E9',
                            color: '#2E7D32',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {opp.required_skills.length > 3 && (
                        <span style={{ fontSize: '11px', color: '#999' }}>
                          +{opp.required_skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {opp.ngo_id && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#666', 
                    fontSize: '14px',
                    marginTop: '5px'
                  }}>
                    <span>👤</span>
                    <span>Posted by: {opp.ngo_id.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;

