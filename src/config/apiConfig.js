// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hospital-management-system-backend-kappa.vercel.app';
export const API_ENDPOINTS = {
  // User endpoints
  USER_LOGIN: '/api/v1/user/patient/login',
  USER_REGISTER: '/api/v1/user/patient/register',
  USER_LOGOUT: '/api/v1/user/patient/logout',
  USER_ME: '/api/v1/user/patient/me',
  GET_DOCTORS: '/api/v1/user/doctors',

  // Appointment endpoints
  POST_APPOINTMENT: '/api/v1/appointment/post',

  // Message endpoints
  SEND_MESSAGE: '/api/v1/message/send',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
