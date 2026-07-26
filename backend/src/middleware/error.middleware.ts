import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";

import { logger } from "../utils/logger";

/**
 * Global Error Middleware
 */
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /**
   * Prevent duplicate responses
   */
  if (res.headersSent) {
    return next(error);
  }

  /**
   * Log error
   */
  logger.error("Unhandled application error", {
    message: error.message,
    path: req.originalUrl,
    method: req.method,
    stack:
      process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });

  /**
   * Custom application errors
   */
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  /**
   * Unexpected errors
   */
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;