// API configurations
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  USERS: {
    PROFILE: '/users/profile',
  },
} as const;

// Helper function for building URLs
export const createApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};