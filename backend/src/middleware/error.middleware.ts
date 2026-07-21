import {
  Request,
  Response,
  NextFunction,
} from "express";

/**
 * Global error middleware
 */
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Prevent headers-sent issues
   */
  if (res.headersSent) {
    return next(error);
  }

  /**
   * Server-side logging
   */
  console.error(
    "[GLOBAL_ERROR]",
    {
      message: error.message,
      stack:
        process.env.NODE_ENV ===
        "development"
          ? error.stack
          : undefined,
      path: req.originalUrl,
      method: req.method,
      timestamp:
        new Date().toISOString(),
    }
  );

  /**
   * Generic secure response
   */
  return res.status(500).json({
    success: false,
    message:
      "Internal server error",
  });
};

export default errorMiddleware;