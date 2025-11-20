import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./WasteZeroSignUp.css";
import { authAPI, tokenManager } from "../services/api";

export default function WasteZeroSignUp() {
  // local show/hide for password icons
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add a body class while this page is mounted to override global centering
  useEffect(() => {
    document.body.classList.add("signup-reset-body");
    return () => document.body.classList.remove("signup-reset-body");
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Sign up form submitted");
    console.log("Form data:", { name, username, email, password, role });

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("Calling API register...");
      const response = await authAPI.register({
        name,
        username,
        email,
        password,
        role,
      });
      console.log("Registration response:", response);
      tokenManager.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
      tokenManager.setUser(response.user);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup-root"
      // use public image for outer page background so webpack will not try to resolve it
      style={{
        backgroundImage: `url('/s.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* small left logo (absolute) */}
      <div className="signup-logo">
        <img src="/logo.png" alt="WasteZero logo" />
      </div>

      <div className="signup-card">
        {/* left illustration */}
        <div className="signup-left">
          <img
            src="/recycle-final.png"
            alt="recycle illustration"
            className="recycle-illustration"
          />
        </div>

        {/* right form column */}
        <div className="signup-right">
          <h2 className="signup-title">Sign-Up</h2>
          <p className="signup-sub">Create Your Account to Join With WasteZero</p>

          <form className="signup-form" onSubmit={handleSignUp}>
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            
            <div className="input-row">
              <input 
                placeholder="Name" 
                className="input-pill"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User className="icon-right" />
            </div>

            <div className="input-row">
              <input 
                placeholder="User Name" 
                className="input-pill"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User className="icon-right" />
            </div>

            <div className="input-row">
              <input 
                type="email" 
                placeholder="Mail id" 
                className="input-pill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="icon-right" />
            </div>

            <div className="two-col-row">
              <div className="input-row half">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input-pill"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon-right btn-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <div className="input-row half">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input-pill"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon-right btn-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="input-row">
              <select 
                className="input-pill"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ paddingRight: '40px' }}
              >
                <option value="">Select Your Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <Lock className="icon-right" />
            </div>

            <div style={{ textAlign: "center", marginTop: 18 }}>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign-Up"}
              </button>
            </div>

            <div className="divider-row">
              <div className="hr" />
              <div className="alt-text">ALTERNATIVE SIGN-UP METHOD</div>
              <div className="hr" />
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


            <p className="login-link">
              Already have an account? <a href="/login">Log-In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
