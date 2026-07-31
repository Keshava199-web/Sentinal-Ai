import {
  Request,
  Response,
  NextFunction,
} from "express";

// import { Role } from "@prisma/client";

// import { buildUserResponse } from "../utils/userResponse";

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
      return res.status(409).json({
        success: false,
        message:
          "Registration failed",
      });
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
    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
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
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
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
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
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
    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt:
          user.createdAt,
      },
    });
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
