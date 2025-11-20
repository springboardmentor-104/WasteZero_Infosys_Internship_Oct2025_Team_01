// src/pages/SignUp.jsx
// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <h2>Login (placeholder)</h2>
        <p>This is a placeholder login page.</p>
        <p><Link to="/signup">Go to Sign up</Link></p>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    </div>
  );
}
