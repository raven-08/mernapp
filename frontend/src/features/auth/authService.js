import axios from "axios";

const API_URL = "https://mernapp-server-0zza.onrender.com/api/users/";

// Register a user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data && response.data.token) {
      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw error; // Pass error to be handled by the caller
  }
};

// Login a user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data && response.data.token) {
      // Store user data and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw error; // Pass error to be handled by the caller
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
