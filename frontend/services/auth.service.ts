import { api } from "@/lib/api";
import {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return data;
};