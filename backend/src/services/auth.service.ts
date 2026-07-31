import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

import { env } from "../config/env";
import {
  JWT_CONFIG,
  PASSWORD_CONFIG,
} from "../constants/auth.constants";

export const hashPassword = async (
  password: string
): Promise<string> => {
  return bcrypt.hash(
    password,
    PASSWORD_CONFIG.SALT_ROUNDS
  );
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(
    password,
    hashedPassword
  );
};

export const generateToken = (
  userId: string,
  email: string,
  role: Role
): string => {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    env.JWT_SECRET,
    {
      expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    }
  );
};