import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma";
import { normalize } from "node:path";

/**
 * Validate JWT secret at startup
 */
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;

    /**
     * Validate input types
     */
    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input types",
      });
    }

    /**
     * Basic validation
     */
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /**
     * Normalize email
     */
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    /**
     * Gmail validation
     */
    const gmailRegex =
     /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(normalizedEmail)) {
        return res.status(400).json({
        success: false,
        message: "Only Gmail accounts are allowed",
  });
}

    /**
     * Strong Password policy
     */
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(normalizedPassword)) {
        return res.status(400).json({
        success: false,
        message:
            "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
  });
}

/**
 * Allowed roles
 */
const allowedRoles = [
  "ADMIN",
  "ANALYST",
  "VIEWER",
];

/**
 * Normalize role
 */
if (
  role !== undefined &&
  typeof role !== "string"
) {
  return res.status(400).json({
    success: false,
    message: "Invalid role type",
  });
}

const normalizedRole =
  role?.trim().toUpperCase() ||
  "VIEWER";

/**
 * Validate role
 */
if (
  !allowedRoles.includes(
    normalizedRole
  )
) {
  return res.status(400).json({
    success: false,
    message: "Invalid role",
  });
}

    /**
     * Check existing user
     */
    // await bcrypt.hash(normalizedPassword, 1);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Registration failed",
      });
    }

    /**
     * Hash password
     */
    const hashedPassword = await bcrypt.hash(
      normalizedPassword,
      10
    );

    /**
     * Create user
     */
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    /**
     * Generate JWT token
     */
    const token = jwt.sign(
      {
        userId: user.id,
        role: (user as any).role
        // role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /**
     * Success response
     */
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: (user as any).role
        // role: user.role,
      },
    });
  } catch (error) {
    
    // console.error("[REGISTER_ERROR]", error);
    console.error(
        "[REGISTER_ERROR]",
        error instanceof Error
            ? error.message
            : "Unknown error"
    );
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    /**
     * Validate input types
     */
    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input types",
      });
    }

    /**
     * Basic validation
     */
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /**
     * Normalize credentials
     */
    const normalizedEmail =
      email.trim().toLowerCase();

    const normalizedPassword =
      password.trim();

    /**
     * Gmail validation
     */
    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Only Gmail accounts are allowed",
      });
    }

    /**
     * Find user
     */
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    /**
     * Invalid credentials
     */
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /**
     * Compare password
     */
    const isPasswordValid =
      await bcrypt.compare(
        normalizedPassword,
        user.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /**
     * Generate JWT
     */
    const token = jwt.sign(
      {
        userId: user.id,
        role: (user as any).role
        // role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /**
     * Success response
     */
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: (user as any).role
        // role: user.role,
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