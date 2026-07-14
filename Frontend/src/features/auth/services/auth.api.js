// src/api/auth.api.js

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    return Promise.reject(error);
  }
);

// ======================
// Register
// ======================
export const register = async (userData) => {
  try {
    const { data } = await api.post("/api/auth/register", userData);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ======================
// Login
// ======================
export const login = async (credentials) => {
  try {
    const { data } = await api.post("/api/auth/login", credentials);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ======================
// Logout
// ======================
export const logout = async () => {
  try {
    const { data } = await api.get("/api/auth/logout");
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ======================
// Get Current User
// ======================
export const getMe = async () => {
  try {
    const { data } = await api.get("/api/auth/get-me");
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Export Axios instance
export default api;