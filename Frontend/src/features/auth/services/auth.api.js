import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Register
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
    return null;
  }
}

// Login
export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    console.log("Login Response:", response);
    return response.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    return null;
  }
}

// Logout
export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (err) {
    console.error("Logout Error:", err.response?.data || err.message);
    return null;
  }
}

// Get Current User
export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (err) {
    console.error("Get Me Error:", err.response?.data || err.message);
    return null;
  }
}