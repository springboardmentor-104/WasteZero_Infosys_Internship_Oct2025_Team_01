import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateOpportunity from './pages/CreateOpportunity';
import Opportunities from './pages/Opportunities';
import OpportunityDetail from './pages/OpportunityDetail';
import Messages from './pages/Messages';
import Admin from './pages/Admin';
import SchedulePickup from './pages/SchedulePickup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import Navbar from './components/Navbar';
import SidebarLayout from './components/SidebarLayout';
import { getAuthToken, getUser } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    const userData = getUser();
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <><Navbar user={user} setUser={setUser} /><Login setUser={setUser} /></> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <><Navbar user={user} setUser={setUser} /><Register setUser={setUser} /></> : <Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <Dashboard user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-opportunity"
          element={
            <ProtectedRoute allowedRoles={['NGO']}>
              <SidebarLayout user={user} setUser={setUser}>
                <CreateOpportunity user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <Opportunities user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunity/:id"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <OpportunityDetail user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <Messages user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SidebarLayout user={user} setUser={setUser}>
                <Admin user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule-pickup"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <SchedulePickup user={user} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <Profile user={user} setUser={setUser} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <Settings user={user} setUser={setUser} />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/help-support"
          element={
            <ProtectedRoute>
              <SidebarLayout user={user} setUser={setUser}>
                <HelpSupport />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

