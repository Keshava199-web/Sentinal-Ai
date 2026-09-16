import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Role } from "@prisma/client";

import { env } from "../config/env";
import { JWT_CONFIG } from "../constants/auth.constants";

/**
 * JWT Authentication Middleware
 *
 * Verifies access tokens issued by Sentinel-AI.
 */
export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const token = authHeader.slice("Bearer ".length).trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      !("email" in decoded) ||
      !("role" in decoded)
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    if (
      typeof decoded.userId !== "string" ||
      typeof decoded.email !== "string" ||
      typeof decoded.role !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }

    if (!Object.values(Role).includes(decoded.role as Role)) {
      res.status(401).json({
        success: false,
        message: "Invalid token role",
      });
      return;
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as Role,
    };

    next();
  } catch (error) {
    console.error(
      "[AUTH_MIDDLEWARE]",
      error instanceof Error ? error.message : "Unknown error",
    );

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};