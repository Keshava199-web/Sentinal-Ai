import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

/**
 * Validate JWT secret
 */
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

/**
 * Extend Express Request
 */
export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

/**
 * JWT Authentication Middleware
 */
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Get authorization header
     */
    const authHeader =
      req.headers.authorization;

    /**
     * Validate authorization header
     */
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /**
     * Extract token
     */
    const token =
      authHeader.split(" ")[1];

    /**
     * Validate token existence
     */
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /**
     * Verify JWT
     */
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    /**
     * Validate decoded payload
     */
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    /**
     * Attach user to request
     */
    req.user = {
      userId: String(decoded.userId),
    };

    next();
  } catch (error) {
    console.error(
      "[AUTH_MIDDLEWARE]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};