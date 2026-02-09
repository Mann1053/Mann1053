import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attaches Authorization Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handles Token Expiry & Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If 401 (Unauthorized) and token is not refreshed yet
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/my-admin/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
