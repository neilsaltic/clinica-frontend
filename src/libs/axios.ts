import axios from "axios";
import { useAuthStore } from "../stores/authStore"; // 👈 Importamos tu store

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
});

// Interceptor de request: obtiene el token directamente desde Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // 👈 Leemos del store con persist
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response: si el backend responde 401, limpia la sesión y redirige
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
