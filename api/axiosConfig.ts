// src/api/axiosConfig.ts
import axios from "axios";

// 🔹 Lee la URL del backend desde tu .env (Expo usa EXPO_PUBLIC_)
const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://tickealo-backend-nest-development.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Helpers para manejar el token JWT
export const addHeaderAuthorization = (access_token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

export const removeHeaderAuthorization = () => {
  delete api.defaults.headers.common["Authorization"];
};

export default api;
