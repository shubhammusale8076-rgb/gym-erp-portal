import axios from 'axios';
import { getToken } from '../utils/auth';
import { API_BASE_URL } from './apiconstants';

// Import store directly to dispatch actions outside of React components
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Flag to prevent multiple session expired dispatches
let isSessionExpiring = false;

// Store abort controllers for pending requests to cancel them on logout
const pendingRequests = new Map();

export const cancelAllPendingRequests = () => {
  pendingRequests.forEach((controller) => {
    controller.abort('Session expired or user logged out.');
  });
  pendingRequests.clear();
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token if available
    const token = getToken(); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Add an abort controller to the request
    const controller = new AbortController();
    config.signal = controller.signal;
    
    // Store it by a unique request ID (or just the object reference)
    const requestId = Date.now().toString() + Math.random().toString();
    config.metadata = { requestId };
    pendingRequests.set(requestId, controller);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Remove from pending requests
    if (response.config.metadata?.requestId) {
      pendingRequests.delete(response.config.metadata.requestId);
    }
    return response;
  },
  (error) => {
    // Remove from pending requests
    if (error.config?.metadata?.requestId) {
      pendingRequests.delete(error.config.metadata.requestId);
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Handle unauthorized or forbidden errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (!isSessionExpiring && store) {
        isSessionExpiring = true;
        cancelAllPendingRequests();
        
        // Dynamically import the action to avoid circular dependencies if needed, 
        // but we can import it directly since it's just a Redux action.
        import('../redux/authSlice').then(({ sessionExpired }) => {
          store.dispatch(sessionExpired());
          
          // Reset flag after a delay to allow the UI to handle the modal
          setTimeout(() => {
            isSessionExpiring = false;
          }, 3000);
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
