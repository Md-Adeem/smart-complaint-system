import axios from "axios";

// Determine environment
const isProduction = import.meta.env.MODE === "production";

// Use the appropriate base URL
const baseURL = isProduction 
  ? import.meta.env.VITE_BASEURL 
  : import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ✅ required for sending cookies
});

export default axiosInstance;
