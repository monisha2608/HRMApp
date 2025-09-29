import axios from "axios";

const API_URL = "https://localhost:5001/api"; // your backend

export const getJobs = async () => {
  return axios.get(`${API_URL}/jobs`);
};

export const applyJob = async (candidate) => {
  return axios.post(`${API_URL}/candidates`, candidate);
};
