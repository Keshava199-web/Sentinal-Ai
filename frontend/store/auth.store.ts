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

        loginUser: async (
          credentials,
        ) => {
          const response =
            await login(credentials);

          set({
            token: response.token,
            user: response.user,
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
      },
    ),
  );