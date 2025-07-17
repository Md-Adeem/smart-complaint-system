import axios from "axios";

const isProduction = import.meta.env.MODE === "production";

const baseURL = isProduction 
  ? import.meta.env.VITE_BASEURL        // used in production
  : import.meta.env.VITE_BASE_URL;      // used in development

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;

