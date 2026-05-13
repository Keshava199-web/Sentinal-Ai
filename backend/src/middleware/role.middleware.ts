import {
  Request,
  Response,
  NextFunction,
} from "express";

/**
 * Extended Request Type
 */
interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

/**
 * Role Authorization Middleware
 */
export const authorizeRoles =
  (...allowedRoles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /**
       * Ensure authenticated user exists
       */
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      /**
       * Check allowed roles
       */
      if (
        !allowedRoles.includes(
          req.user.role
        )
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };