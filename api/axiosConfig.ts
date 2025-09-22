import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://tickealo-backend-nest-development.up.railway.app/api";
const TOKEN_KEY = "authToken";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const saveToken = async (access_token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  await SecureStore.setItemAsync(TOKEN_KEY, access_token);
};

export const removeToken = async () => {
  api.defaults.headers.common["Authorization"] = "";
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export default api;
