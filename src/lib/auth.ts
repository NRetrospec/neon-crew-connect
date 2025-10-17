import axios from 'axios';

interface User {
  email: string;
  id: string;
  name: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Mock login function - replace with real API call later
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation - in real app, this would be done on backend
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // For demo, create mock user data
  const mockUser: User = {
    id: `user-${Date.now()}`,
    email: email,
    name: email.split('@')[0], // Use part before @ as name
  };

  // For demo, accept any email/password
  // In real app, send to backend and get JWT
  const mockToken = `mock-jwt-token-${Date.now()}`;

  return {
    user: mockUser,
    token: mockToken
  };
};


// Store token and user in localStorage
export const setAuthToken = (token: string, user: User) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};


// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Remove token and user (logout)
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};


// Mock sign up function - replace with real API call later
export const signUp = async (data: { username: string; email: string; password: string; favoriteGame: string; themeColor: string }): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock validation - in real app, this would be done on backend
  if (!data.email || !data.password || !data.username) {
    throw new Error('Username, email and password are required');
  }

  // For demo, create mock user data
  const mockUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.username,
  };

  // For demo, accept any data
  // In real app, send to backend and get JWT
  const mockToken = `mock-jwt-token-${Date.now()}`;

  return {
    user: mockUser,
    token: mockToken
  };
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
