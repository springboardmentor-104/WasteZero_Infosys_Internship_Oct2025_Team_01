import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const SidebarLayout = ({ user, setUser, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/opportunities', label: 'Eco Opportunities', icon: '🌱' },
    { path: '/schedule-pickup', label: 'Pickup Schedule', icon: '📅' },
    { path: '/messages', label: 'Messages', icon: '💬' },
    { path: '/profile', label: 'My Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    { path: '/help-support', label: 'Help & Support', icon: '❓' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: 'white',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #E0E0E0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ fontSize: '24px' }}>♻️</div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>WasteZero</h2>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px 20px',
                color: isActive(item.path) ? '#2E7D32' : '#666',
                textDecoration: 'none',
                backgroundColor: isActive(item.path) ? '#E8F5E9' : 'transparent',
                borderLeft: isActive(item.path) ? '4px solid #2E7D32' : '4px solid transparent',
                transition: 'all 0.3s',
                fontWeight: isActive(item.path) ? '600' : '400'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                  e.currentTarget.style.color = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#666';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div style={{ padding: '20px', borderTop: '1px solid #E0E0E0' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b71c1c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{
        marginLeft: '250px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          color: '#333',
          padding: '15px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #E0E0E0'
        }}>
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search opportunities..."
              style={{
                width: '100%',
                padding: '10px 15px',
                borderRadius: '25px',
                border: '1px solid #E0E0E0',
                fontSize: '14px',
                backgroundColor: '#F5F5F5',
                color: '#333',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4CAF50';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0E0E0';
                e.target.style.backgroundColor = '#F5F5F5';
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '20px', cursor: 'pointer', color: '#666' }}>🔔</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#F5F5F5',
              color: '#333'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span style={{ color: '#333' }}>{user?.name || 'User'}</span>
              <span style={{ color: '#666' }}>▼</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          padding: '30px',
          backgroundColor: '#f5f5f5',
          overflowY: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;

