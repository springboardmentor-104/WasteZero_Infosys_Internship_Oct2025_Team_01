import { useState, useEffect } from 'react';
import { messageAPI, applicationAPI } from '../services/api';

const Messages = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      // Fetch applications to get potential conversation partners
      const response = await applicationAPI.getMyApplications();
      const apps = response.data;
      
      // Create conversation list from applications
      let convos = apps.map(app => ({
        id: app.opportunity_id?._id || app._id,
        name: app.opportunity_id?.ngo_id?.name || app.volunteer_id?.name || 'Unknown User',
        lastMessage: 'Click to start conversation',
        opportunity: app.opportunity_id?.title || 'Opportunity',
        status: app.status
      }));
      
      // Add demo conversations if no real conversations exist
      if (convos.length === 0) {
        convos = [
          {
            id: 'demo1',
            name: 'Green Earth NGO',
            lastMessage: 'Thank you for your interest! We\'d love to have you join us.',
            opportunity: 'Beach Cleanup Initiative',
            status: 'active',
            demoMessages: [
              {
                content: 'Hello! I saw your beach cleanup opportunity and I\'m very interested in participating.',
                sender: user?.name || 'You',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'Thank you for your interest! We\'d love to have you join us. The cleanup is scheduled for next Saturday at 9 AM.',
                sender: 'Green Earth NGO',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'That sounds great! I\'ll be there. What should I bring?',
                sender: user?.name || 'You',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'Please bring gloves, a reusable water bottle, and wear comfortable clothes. We\'ll provide trash bags and other equipment.',
                sender: 'Green Earth NGO',
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
              }
            ]
          },
          {
            id: 'demo2',
            name: 'Eco Warriors',
            lastMessage: 'Your application has been accepted! Welcome to the team.',
            opportunity: 'Electronics Recycling Drive',
            status: 'accepted',
            demoMessages: [
              {
                content: 'Hi, I just applied for the Electronics Recycling Drive. I have several old devices to donate.',
                sender: user?.name || 'You',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'Your application has been accepted! Welcome to the team. We\'re excited to have you.',
                sender: 'Eco Warriors',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'Thank you! When can I drop off the electronics?',
                sender: user?.name || 'You',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'You can drop them off any day this week between 10 AM and 4 PM at our main office. Address: 123 Green Street.',
                sender: 'Eco Warriors',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          },
          {
            id: 'demo3',
            name: 'Community Recycling Hub',
            lastMessage: 'We have a few questions about your availability.',
            opportunity: 'Paper Recycling Workshop',
            status: 'pending',
            demoMessages: [
              {
                content: 'Hello, I applied for the Paper Recycling Workshop. I\'m available on weekends.',
                sender: user?.name || 'You',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                content: 'We have a few questions about your availability. Are you free this Saturday afternoon?',
                sender: 'Community Recycling Hub',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          }
        ];
      } else {
        // Add demo messages to existing conversations
        convos = convos.map(conv => {
          if (conv.id === convos[0]?.id) {
            return {
              ...conv,
              lastMessage: 'Thank you for your interest!',
              demoMessages: [
                {
                  content: 'Hello! I\'m interested in this opportunity.',
                  sender: user?.name || 'You',
                  timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  content: 'Thank you for your interest! We\'ll review your application and get back to you soon.',
                  sender: conv.name,
                  timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
                }
              ]
            };
          }
          return conv;
        });
      }
      
      setConversations(convos);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // Add demo conversations on error
      setConversations([
        {
          id: 'demo1',
          name: 'Green Earth NGO',
          lastMessage: 'Thank you for your interest! We\'d love to have you join us.',
          opportunity: 'Beach Cleanup Initiative',
          status: 'active',
          demoMessages: [
            {
              content: 'Hello! I saw your beach cleanup opportunity and I\'m very interested in participating.',
              sender: user?.name || 'You',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              content: 'Thank you for your interest! We\'d love to have you join us. The cleanup is scheduled for next Saturday at 9 AM.',
              sender: 'Green Earth NGO',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    try {
      // In a real app, fetch messages for this conversation
      // For demo, use demo messages if available
      if (conversation.demoMessages) {
        setMessages(conversation.demoMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      // In a real app, send message via API
      const tempMessage = {
        content: newMessage,
        sender: user.name,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, tempMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          Messages
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Connect with volunteers and organizations
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '20px',
        height: 'calc(100vh - 250px)',
        minHeight: '600px'
      }}>
        {/* Conversations List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #F0F0F0',
            backgroundColor: '#F9F9F9'
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Conversations</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>💬</div>
                <p>No conversations yet</p>
                <p style={{ fontSize: '12px' }}>Start by applying to opportunities</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #F0F0F0',
                    cursor: 'pointer',
                    backgroundColor: selectedConversation?.id === conv.id ? '#E8F5E9' : 'white',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConversation?.id !== conv.id) {
                      e.currentTarget.style.backgroundColor = '#F9F9F9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConversation?.id !== conv.id) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                    {conv.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>
                    {conv.opportunity}
                  </div>
                      <div style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.lastMessage}
                  </div>
                  {conv.demoMessages && conv.demoMessages.length > 0 && (
                    <div style={{ fontSize: '10px', color: '#4CAF50', marginTop: '5px' }}>
                      {conv.demoMessages.length} message{conv.demoMessages.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #F0F0F0',
                backgroundColor: '#F9F9F9'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                  {selectedConversation.name}
                </h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                  {selectedConversation.opportunity}
                </p>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {messages.length === 0 ? (
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '48px', marginBottom: '10px' }}>💬</div>
                      <p>No messages yet</p>
                      <p style={{ fontSize: '12px' }}>Start the conversation!</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: msg.sender === user.name ? 'flex-end' : 'flex-start',
                        maxWidth: '70%'
                      }}
                    >
                      <div style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: msg.sender === user.name ? '#4CAF50' : '#F0F0F0',
                        color: msg.sender === user.name ? 'white' : '#333'
                      }}>
                        {msg.content}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#999',
                        marginTop: '5px',
                        textAlign: msg.sender === user.name ? 'right' : 'left'
                      }}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div style={{
                padding: '20px',
                borderTop: '1px solid #F0F0F0',
                display: 'flex',
                gap: '10px'
              }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>💬</div>
                <h3 style={{ color: '#666', marginBottom: '10px' }}>Select a conversation</h3>
                <p style={{ fontSize: '14px' }}>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

