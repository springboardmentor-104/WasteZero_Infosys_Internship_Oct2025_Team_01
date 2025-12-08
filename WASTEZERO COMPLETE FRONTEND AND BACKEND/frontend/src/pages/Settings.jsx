import { useState } from 'react';

const Settings = ({ user, setUser }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    language: 'en',
    theme: 'light'
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, save settings to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          Settings
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Manage your account preferences and settings
        </p>
      </div>

      <div style={{ maxWidth: '800px' }}>
        {/* Notification Settings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, marginBottom: '20px', fontSize: '20px', color: '#333' }}>
            Notifications
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                  Email Notifications
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Receive email updates about opportunities and messages
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '26px'
              }}>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.emailNotifications ? '#4CAF50' : '#ccc',
                  borderRadius: '26px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    transform: settings.emailNotifications ? 'translateX(24px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                  Push Notifications
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Get instant notifications on your device
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '26px'
              }}>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.pushNotifications ? '#4CAF50' : '#ccc',
                  borderRadius: '26px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    transform: settings.pushNotifications ? 'translateX(24px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '5px', color: '#333' }}>
                  Weekly Digest
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Receive a weekly summary of activities
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '26px'
              }}>
                <input
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={(e) => handleChange('weeklyDigest', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.weeklyDigest ? '#4CAF50' : '#ccc',
                  borderRadius: '26px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    transform: settings.weeklyDigest ? 'translateX(24px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, marginBottom: '20px', fontSize: '20px', color: '#333' }}>
            Preferences
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, marginBottom: '20px', fontSize: '20px', color: '#333' }}>
            Account Actions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0b7dda'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
            >
              Change Password
            </button>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F57C00'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF9800'}
            >
              Export Data
            </button>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {saved && (
            <div style={{
              padding: '10px 20px',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>✓</span>
              <span>Settings saved!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            style={{
              padding: '12px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

