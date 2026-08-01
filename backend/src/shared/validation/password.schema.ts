import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(12, "Password must be at least 12 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain uppercase letter")
  .regex(/[a-z]/, "Password must contain lowercase letter")
  .regex(/[0-9]/, "Password must contain number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain special character"
  );