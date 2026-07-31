import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const persistedStore =
      localStorage.getItem("sentinel-auth");

    if (persistedStore) {
      const { state } = JSON.parse(persistedStore);

      const token = state?.token;

      if (token) {
        config.headers = config.headers ?? {};

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }
  }

  return config;
});