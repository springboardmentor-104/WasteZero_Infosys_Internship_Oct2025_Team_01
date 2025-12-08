import { useState } from 'react';

const HelpSupport = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I apply for an opportunity?',
          a: 'Browse the Eco Opportunities page, click on an opportunity that interests you, and click the "Apply" button. Fill out the application form and submit it.'
        },
        {
          q: 'What types of opportunities are available?',
          a: 'We offer various opportunities including waste pickup, recycling drives, beach cleanups, educational workshops, and more. Check the opportunities page for current listings.'
        },
        {
          q: 'How do I schedule a waste pickup?',
          a: 'Go to the Pickup Schedule page, fill out the form with your location, waste type, date, and time. Our team will review and confirm your pickup request.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      questions: [
        {
          q: 'How do I update my profile?',
          a: 'Navigate to "My Profile" in the sidebar, edit your information, and click "Update Profile" to save your changes.'
        },
        {
          q: 'Can I change my role?',
          a: 'Your role is set during registration. If you need to change your role, please contact support.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Go to Settings and click "Change Password". You will receive instructions via email to reset your password.'
        }
      ]
    },
    {
      category: 'Messages & Communication',
      questions: [
        {
          q: 'How do I message someone?',
          a: 'Go to the Messages page, select a conversation from the list, or start a new conversation with someone you\'ve interacted with through opportunities.'
        },
        {
          q: 'Can I message before applying?',
          a: 'You can message organizers after you\'ve applied to their opportunity or if they\'ve contacted you first.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'The page is not loading properly',
          a: 'Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact our technical support.'
        },
        {
          q: 'I forgot my password',
          a: 'Click on "Forgot Password" on the login page, or go to Settings > Change Password to reset it.'
        }
      ]
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ subject: '', message: '' });
    }, 3000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          Help & Support
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Find answers to common questions or contact our support team
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* FAQ Section */}
        <div>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
            Frequently Asked Questions
          </h2>
          
          {faqs.map((category, catIdx) => (
            <div
              key={catIdx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '20px'
              }}
            >
              <h3 style={{
                margin: 0,
                marginBottom: '15px',
                fontSize: '18px',
                color: '#2E7D32',
                fontWeight: '600'
              }}>
                {category.category}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {category.questions.map((faq, qIdx) => (
                  <div key={qIdx}>
                    <button
                      onClick={() => setActiveSection(activeSection === `${catIdx}-${qIdx}` ? null : `${catIdx}-${qIdx}`)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: activeSection === `${catIdx}-${qIdx}` ? '#E8F5E9' : '#F9F9F9',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <span style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                        {faq.q}
                      </span>
                      <span style={{ fontSize: '18px', color: '#666' }}>
                        {activeSection === `${catIdx}-${qIdx}` ? '−' : '+'}
                      </span>
                    </button>
                    {activeSection === `${catIdx}-${qIdx}` && (
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#F9F9F9',
                        borderRadius: '8px',
                        marginTop: '8px',
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
            Contact Support
          </h2>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            {submitted && (
              <div style={{
                padding: '15px',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '20px' }}>✓</span>
                <span>Message sent! We'll get back to you within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="What can we help you with?"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your issue or question..."
                  rows="6"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: 0, marginBottom: '20px', fontSize: '18px', color: '#333' }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/dashboard" style={{
                color: '#4CAF50',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>→</span>
                <span>Go to Dashboard</span>
              </a>
              <a href="/opportunities" style={{
                color: '#4CAF50',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>→</span>
                <span>Browse Opportunities</span>
              </a>
              <a href="/profile" style={{
                color: '#4CAF50',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>→</span>
                <span>Update Profile</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{
            backgroundColor: '#E8F5E9',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <h4 style={{ margin: 0, marginBottom: '10px', color: '#2E7D32' }}>
              Need Immediate Help?
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              Email us at <strong>support@wastezero.com</strong><br />
              Call us at <strong>1-800-WASTE-ZERO</strong><br />
              Available Monday-Friday, 9 AM - 6 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;

