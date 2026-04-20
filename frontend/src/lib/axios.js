import axios from "axios";

const envApiUrl = import.meta.env.VITE_API_URL;

const baseURL = import.meta.env.PROD
  ? (envApiUrl?.startsWith("/") ? envApiUrl : "/api")
  : envApiUrl || "http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
