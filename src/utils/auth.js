// utils/auth.js

// Function to safely decode JWT without a library
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  // exp is in seconds, convert to ms
  const now = Date.now();
  return decoded.exp * 1000 < now;
};

// Getting token: checks sessionStorage first, then falls back to localStorage 
// (for backward compatibility if we are migrating)
export const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

export const getUserId = () => {
  return sessionStorage.getItem("userId") || localStorage.getItem("userId");
};

export const getRole = () => {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
};

export const setAuthData = (token, userId, role) => {
  // Save to sessionStorage as requested
  sessionStorage.setItem("token", token);
  if (userId) sessionStorage.setItem("userId", userId);
  if (role) sessionStorage.setItem("role", role);
  
  // Remove from localStorage to migrate the user fully to sessionStorage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");

  // Trigger cross-tab sync event
  localStorage.setItem("auth_sync_login", Date.now().toString());
};

export const clearAuthData = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("role");
  
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");

  // Avoid clearing other localStorage preferences like theme, etc.
  
  // Trigger cross-tab sync event
  localStorage.setItem("auth_sync_logout", Date.now().toString());
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
};