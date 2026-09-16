"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { login } from "@/services/auth.service";
import {
  AuthUser,
  LoginRequest,
} from "@/types/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  hasHydrated: boolean;

  setHasHydrated: (value: boolean) => void;

  loginUser: (
    credentials: LoginRequest,
  ) => Promise<void>;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        token: null,
        user: null,
        isAuthenticated: false,

        hasHydrated: false,

        setHasHydrated: (value) =>
          set({ hasHydrated: value }),

        loginUser: async (credentials) => {
          const response =
            await login(credentials);

          set({
            token: response.data.token,
            user: response.data.user,
            isAuthenticated: true,
          });
        },

        logout: () =>
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "sentinel-auth",

        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
  );