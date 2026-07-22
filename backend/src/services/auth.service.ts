import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { Role } from "@prisma/client";

import { env } from "../config/env";

/**
 * Hash password
 */
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

/**
 * Compare password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT
 */
export const generateToken = (userId: string, email: string, role: Role) => {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "15m",
      issuer: "sentinel-ai",
      audience: "sentinel-ai-users",
    },
  );
};
