import {
  Request,
  Response,
  NextFunction,
} from "express";

import { toAuthResponseDto } from "../dto/auth/auth.dto";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { HTTP_STATUS } from "../constants/http.constants";

import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../services/auth.service";

import prisma from "../config/prisma";

import {
  createAuditLog,
} from "../utils/auditLogger";

/**
 * Register Controller
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Extract validated body
     */
    const {
      email,
      password,
    } = req.body;

    /**
     * Normalize email
     */
    const normalizedEmail =
      email.trim().toLowerCase();

    /**
     * Check existing user
     */
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email:
            normalizedEmail,
        },
      });

    /**
     * Prevent duplicate accounts
     */
    if (existingUser) {
      return errorResponse(
        res,
        HTTP_STATUS.CONFLICT,
        "Registration failed",
      );
    }

    /**
     * Hash password
     */
    const hashedPassword =
      await hashPassword(
        password
    );

    /**
     * Create user
     */
    const user =
      await prisma.user.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword,
        },
      });

    /**
     * Generate JWT
     */
    const token =
    generateToken(
      user.id,
      user.email,
      user.role,
    );

    /**
     * Create audit log
     */
    createAuditLog(
      "USER_REGISTERED",
      user.id
    ).catch(console.error);

    /**
     * Success response
     */
    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      "User registered successfully",
      toAuthResponseDto(token, user),
    );
  } catch (error) {
    console.error(
      "[REGISTER_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};

/**
 * Login Controller
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Extract validated body
     */
    const {
      email,
      password,
    } = req.body;

    /**
     * Normalize email
     */
    const normalizedEmail =
      email.trim().toLowerCase();

    /**
     * Find user
     */
    const user =
      await prisma.user.findUnique({
        where: {
          email:
            normalizedEmail,
        },
      });

    /**
     * Prevent user enumeration
     */
    if (!user) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid credentials",
      );
    }

    /**
     * Verify password
     */
    const isPasswordValid =
    await comparePassword(
      password,
      user.password
    );

    /**
     * Invalid password
     */
    if (!isPasswordValid) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid credentials",
      );
    }

    /**
     * Generate JWT
     */
    const token =
    generateToken(
      user.id,
      user.email,
      user.role,
    );

    /**
     * Create audit log
     */
    createAuditLog(
      "USER_LOGIN",
      user.id
    ).catch(console.error);

    /**
     * Success response
     */
    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Login successful",
      toAuthResponseDto(token, user),
    );
  } catch (error) {
    console.error(
      "[LOGIN_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};
