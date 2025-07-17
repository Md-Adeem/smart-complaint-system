import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true, // ✅ required for sending cookies
});

export default axiosInstance;

