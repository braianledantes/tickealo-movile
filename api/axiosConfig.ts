import axios from "axios";

const API_URL = "https://tickealo-backend-nest-development.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addHeaderAuthorization = async (access_token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

export const removeHeaderAuthorization = async () => {
  delete api.defaults.headers.common["Authorization"];
};

export default api;
