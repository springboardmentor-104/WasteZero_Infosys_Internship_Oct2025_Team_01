import { Link, useNavigate } from 'react-router-dom';
import { logout, removeAuthToken, removeUser } from '../utils/auth';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#4CAF50',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
        WasteZero
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/opportunities" style={{ color: 'white', textDecoration: 'none' }}>Opportunities</Link>
            {user.role === 'NGO' && (
              <Link to="/create-opportunity" style={{ color: 'white', textDecoration: 'none' }}>Create Opportunity</Link>
            )}
            <Link to="/messages" style={{ color: 'white', textDecoration: 'none' }}>Messages</Link>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
            )}
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <button onClick={handleLogout} className="btn" style={{ background: 'white', color: '#4CAF50' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

