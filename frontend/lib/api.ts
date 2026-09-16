import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }

    const persistedStore = localStorage.getItem("sentinel-auth");

    if (!persistedStore) {
      return config;
    }

    try {
      const parsedStore: unknown = JSON.parse(persistedStore);

      if (
        typeof parsedStore !== "object" ||
        parsedStore === null ||
        !("state" in parsedStore)
      ) {
        return config;
      }

      const state = parsedStore.state;

      if (
        typeof state !== "object" ||
        state === null ||
        !("token" in state)
      ) {
        return config;
      }

      const token = state.token;

      if (typeof token !== "string" || token.length === 0) {
        return config;
      }

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    } catch {
      // Never allow malformed persisted auth state
      // to break API requests.
      return config;
    }
  },
  (error: unknown) => Promise.reject(error),
);