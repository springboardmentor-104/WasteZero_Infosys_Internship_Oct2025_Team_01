// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import "./Login.css"; // keep your existing CSS file
import { authAPI, tokenManager } from "../services/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Login form submitted");
    console.log("Login data:", { usernameOrEmail, password: "***" });

    try {
      console.log("Calling API login...");
      const response = await authAPI.login({ usernameOrEmail, password });
      console.log("Login response:", response);
      tokenManager.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
      tokenManager.setUser(response.user);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wz-page">
      <div className="wz-logo">
        <img src="/logo.png" alt="WasteZero" className="wz-logo-img" />
      </div>

      <div className="wz-card">
        <div className="wz-left">
          <img src="/3.png" alt="illustration" className="recycle-image" />
        </div>

        <div className="wz-right">
          <h1 className="wz-title">Log-in</h1>
          <p className="wz-sub">Welcome Back to WasteZero</p>

          <form className="wz-form" onSubmit={handleLogin}>
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            
            <div className="wz-field">
              <input 
                type="text" 
                placeholder="User Name or Email" 
                className="wz-input"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
              <User className="wz-icon" />
            </div>

            <div className="wz-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="wz-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="wz-icon-btn"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="toggle password"
              >
                {showPassword ? <EyeOff className="wz-eye" /> : <Eye className="wz-eye" />}
              </button>
            </div>

            <div className="wz-action">
              <button type="submit" className="wz-cta" disabled={loading}>
                {loading ? "Logging in..." : "Log-in"}
              </button>
            </div>

            <div className="forgot-password" style={{ marginTop: 8 }}>
              {/* THIS must be Link and path must exactly match App.js route */}
              <Link to="/forgotpassword" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <div className="wz-divider">
              <span className="wz-line" />
              <span className="wz-divider-text">ALTERNATIVE LOG-IN METHOD</span>
              <span className="wz-line" />
            </div>
            <div className="social-row" aria-hidden="true">
  <button
    type="button"
    className="social-btn"
    aria-label="Sign in with Google"
  >
    {/* Google SVG */}
    <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#4285F4" d="M533.5 278.4c0-18.2-1.6-36-4.7-53.1H272v100.6h147.3c-6.3 34.2-25.5 63.2-54.4 82.6v68.6h87.8c51.3-47.2 81.8-117.1 81.8-198.7z"/>
      <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.5 180.8-66.6l-87.8-68.6c-24.3 16.3-55.6 25.9-93 25.9-71 0-131.2-47.9-152.7-112.1H29.6v70.6C74.6 478.8 167.7 544.3 272 544.3z"/>
      <path fill="#FBBC05" d="M119.3 325.9c-10.6-31.3-10.6-64.9 0-96.2V159.1H29.6c-40.9 81.8-40.9 177.5 0 259.3l89.7-92.5z"/>
      <path fill="#EA4335" d="M272 108.7c39 0 74.2 13.4 101.8 39.5l76.3-76.3C406 23.3 345.7 0 272 0 167.7 0 74.6 65.5 29.6 159.1l89.7 70.6C140.8 156.6 201 108.7 272 108.7z"/>
    </svg>
  </button>

  <button
    type="button"
    className="social-btn"
    aria-label="Sign in with Facebook"
  >
    {/* Facebook SVG */}
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#1877F2" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82V14.706h-3.2v-3.622h3.2V8.413c0-3.167 1.934-4.892 4.762-4.892 1.354 0 2.517.101 2.855.146v3.312h-1.96c-1.536 0-1.835.73-1.835 1.8v2.363h3.67l-.479 3.622h-3.191V24h6.26C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z"/>
    </svg>
  </button>

  <button
    type="button"
    className="social-btn"
    aria-label="Sign in with Twitter"
  >
    {/* Twitter SVG */}
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#1DA1F2" d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.57 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.957-2.173-1.555-3.591-1.555-2.72 0-4.924 2.204-4.924 4.917 0 .39.045.765.126 1.124C7.691 8.094 4.066 6.13 1.64 3.162c-.427.734-.666 1.588-.666 2.497 0 1.72.87 3.235 2.188 4.123-.807-.026-1.567-.246-2.228-.616v.062c0 2.404 1.693 4.409 3.946 4.866-.413.113-.849.174-1.296.174-.317 0-.626-.03-.927-.086.627 1.956 2.445 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.787-.023-1.17-.068 2.179 1.397 4.768 2.213 7.548 2.213 9.056 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.015-.633.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  </button>
</div>


            <div className="social-row" aria-hidden="true">
              {/* keep your SVG buttons or images here */}
            </div>

            <p className="wz-bottom">
              New User? <Link to="/signup" className="wz-link">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
