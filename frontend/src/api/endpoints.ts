import axios from "axios";
import { getToken } from "@/utils/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
});

export default api;