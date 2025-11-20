// API service for backend integration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('Server error - unable to parse response');
  }
  
  if (!response.ok) {
    // Extract error message from various possible formats
    let errorMessage = 'Something went wrong';
    
    if (data.message) {
      errorMessage = data.message;
    } else if (data.error) {
      errorMessage = data.error;
    } else if (data.errors) {
      // Handle validation errors
      if (typeof data.errors === 'object') {
        const errorKeys = Object.keys(data.errors);
        if (errorKeys.length > 0) {
          const firstError = data.errors[errorKeys[0]];
          errorMessage = firstError.message || firstError;
        }
      } else {
        errorMessage = data.errors;
      }
    }
    
    throw new Error(errorMessage);
  }
  return data;
};

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    console.log("API: Registering user", userData);
    console.log("API URL:", `${API_BASE_URL}/auth/register`);
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log("API: Register response status:", response.status);
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    console.log("API: Logging in user");
    console.log("API URL:", `${API_BASE_URL}/auth/login`);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    console.log("API: Login response status:", response.status);
    return handleResponse(response);
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse(response);
  },

  // Logout user
  logout: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse(response);
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    return handleResponse(response);
  },

  // Change password (protected)
  changePassword: async (accessToken, currentPassword, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },

  // Get user profile (protected)
  getProfile: async (accessToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  },
};

// Token management helpers
export const tokenManager = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken: () => localStorage.getItem('accessToken'),
  
  getRefreshToken: () => localStorage.getItem('refreshToken'),

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  clearUser: () => {
    localStorage.removeItem('user');
  },
};
