import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://localhost:7230",
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: auto-logout on 401 (if you want)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // localStorage.clear(); // uncomment if you want to hard sign-out
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
