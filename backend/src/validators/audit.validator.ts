import { z } from "zod";

/**
 * Allowed roles
 */
const allowedRoles = [
  "ADMIN",
  "ANALYST",
  "VIEWER",
] as const;

/**
 * Register validation schema
 */
export const registerSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email(
        "Invalid email format"
      )
      .max(
        255,
        "Email too long"
      ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .max(
        64,
        "Password too long"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),

    role: z.enum(
        allowedRoles
),
  });

/**
 * Login validation schema
 */
export const loginSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email(
        "Invalid email format"
      )
      .max(
        255,
        "Email too long"
      ),

    password: z
      .string()
      .min(
        1,
        "Password is required"
      ),
  });