// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import "./ForgotPassword.css";
import { authAPI, tokenManager } from "../services/api";

export default function ForgotPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const accessToken = tokenManager.getAccessToken();
      if (!accessToken) {
        setError("You must be logged in to change password");
        setLoading(false);
        return;
      }

      await authAPI.changePassword(accessToken, oldPassword, newPassword);
      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wz-page">
      {/* Top-left logo */}
      <div className="wz-logo">
        <img src="/logo.png" alt="WasteZero" className="wz-logo-img" />
      </div>

      {/* Main Card */}
      <div className="wz-card">
        {/* Left Image */}
        <div className="wz-left">
          <img src="/5.png" alt="lock illustration" className="recycle-image" />
        </div>

        {/* Right Side */}
        <div className="wz-right">
          <h1 className="wz-title">Change Password</h1>
          <p className="wz-sub"></p>

          <form className="wz-form" onSubmit={handleChangePassword}>
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>{success}</div>}
            
            {/* Old Password */}
            <div className="wz-field">
              <input
                type="password"
                placeholder="Old password"
                className="wz-input"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <User className="wz-icon" />
            </div>

            {/* New Password */}
            <div className="wz-field">
              <input
                type="password"
                placeholder="New password"
                className="wz-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Lock className="wz-icon" />
            </div>

            {/* Button */}
            <div className="wz-action">
              <button type="submit" className="wz-cta" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
