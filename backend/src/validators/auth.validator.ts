import { z } from "zod";

import { passwordSchema } from "../shared/validation/password.schema";

/**
 * =========================================================
 * AUTH VALIDATORS
 * =========================================================
 * Security Goals:
 * - Strict input validation
 * - Payload pollution prevention
 * - Input normalization
 * - Strong password enforcement
 * - Protection against oversized payloads
 * =========================================================
 */

/**
 * Allowed user roles
 * NOTE:
 * Keep tightly controlled.
 * Avoid accepting arbitrary role strings.
 */
export const userRoles = [
  "ADMIN",
  "ANALYST",
  "USER",
] as const;

/**
 * =========================================================
 * REGISTER SCHEMA
 * =========================================================
 */
export const registerSchema = z
  .object({

    email: z
      .string()
      .min(1, "Email is required")
      .trim()
      .email("Invalid email address")
      .max(255, "Email too long")
      .toLowerCase(),

    password: passwordSchema,

    /**
     * Optional role assignment
     * IMPORTANT:
     * In production:
     * NEVER allow public registration of ADMIN users.
     * Enforce server-side role restrictions.
     */
    role: z.enum(userRoles).optional().default("USER"),
  })
  .strict();

/**
 * =========================================================
 * LOGIN SCHEMA
 * =========================================================
 */
export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .trim()
      .email("Invalid email address")
      .max(255, "Email too long")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Password is required")
      .max(128, "Password too long"),
  })
  .strict();

/**
 * =========================================================
 * REFRESH TOKEN SCHEMA
 * =========================================================
 */
export const refreshTokenSchema = z
  .object({
    refreshToken: z
      .string()
      .min(10)
      .max(2048)
  })
  .strict();

/**
 * =========================================================
 * CHANGE PASSWORD SCHEMA
 * =========================================================
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .max(128, "Password too long"),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(
        12,
        "Password must be at least 12 characters"
      )
      .max(
        128,
        "Password must not exceed 128 characters"
      )
      .regex(
        /[A-Z]/,
        "Password must contain uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain number"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain special character"
      ),
  })
  .strict();

/**
 * =========================================================
 * FORGOT PASSWORD SCHEMA
 * =========================================================
 */
export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .trim()
      .email("Invalid email address")
      .max(255, "Email too long")
      .toLowerCase(),
  })
  .strict();

/**
 * =========================================================
 * RESET PASSWORD SCHEMA
 * =========================================================
 */
export const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .min(10, "Reset token is required")
      .max(2048, "Token too long"),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(
        12,
        "Password must be at least 12 characters"
      )
      .max(
        128,
        "Password must not exceed 128 characters"
      )
      .regex(
        /[A-Z]/,
        "Password must contain uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain number"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain special character"
      ),
  })
  .strict();

export const incidentQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) =>
      val ? Number(val) : 1
    )
    .refine(
      (val) => Number.isInteger(val) && val > 0,
      {
        message:
          "Page must be a positive integer",
      }
    ),

  limit: z
    .string()
    .optional()
    .transform((val) =>
      val ? Number(val) : 10
    )
    .refine(
      (val) =>
        Number.isInteger(val) &&
        val > 0 &&
        val <= 100,
      {
        message:
          "Limit must be between 1 and 100",
      }
    ),

  severity: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ])
    .optional(),

  status: z
    .enum([
      "OPEN",
      "INVESTIGATING",
      "RESOLVED",
      "CLOSED",
    ])
    .optional(),

  search: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

/**
 * =========================================================
 * TYPE EXPORTS
 * =========================================================
 * Strong typing across controllers/services
 * =========================================================
 */

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type RefreshTokenInput = z.infer<
  typeof refreshTokenSchema
>;

export type ChangePasswordInput = z.infer<
  typeof changePasswordSchema
>;

export type ForgotPasswordInput = z.infer<
  typeof forgotPasswordSchema
>;

export type ResetPasswordInput = z.infer<
  typeof resetPasswordSchema
>;