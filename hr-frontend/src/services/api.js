import axios from "axios";

// must match your backend exactly (scheme + port)
export const API_BASE = "https://hrapp-bgerb7f5ezfjb6ar.canadacentral-01.azurewebsites.net/";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;