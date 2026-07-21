import { NextFunction, Router, Response, Request } from "express";

import prisma from "../config/prisma";

import { protect } from "../middleware/auth.middleware";

import { authorizeRoles } from "../middleware/role.middleware";

import { createAuditLog } from "../utils/auditLogger";

const router = Router();

/**
 * Get Audit Logs
 */
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /**
       * Query params
       */
      const {
        page = "1",
        limit = "20",
        action,
        userId,
      } = req.query;

      /**
       * Validate pagination
       */
      const parsedPage =
        Number(page);

      const parsedLimit =
        Number(limit);

      if (
        Number.isNaN(parsedPage) ||
        Number.isNaN(parsedLimit)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid pagination values",
        });
      }

      /**
       * Safe pagination limits
       */
      const pageNumber = Math.max(
        parsedPage,
        1
      );

      const limitNumber = Math.min(
        Math.max(parsedLimit, 1),
        100
      );

      const skip =
        (pageNumber - 1) *
        limitNumber;

      /**
       * Build filters
       */
      const filters: {
        action?: string;
        userId?: string;
      } = {};

      /**
       * Filter by action
       */
      if (
        typeof action === "string" &&
        action.trim()
      ) {
        filters.action =
          action.trim().toUpperCase();
      }

      /**
       * Filter by userId
       */
      if (
        typeof userId === "string" &&
        userId.trim()
      ) {
        filters.userId =
          userId.trim();
      }

      /**
       * Fetch audit logs
       */
      const logs =
        await prisma.auditLog.findMany({
          where: filters,
          skip,
          take: limitNumber,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            action: true,
            userId: true,
            incidentId: true,
            createdAt: true,
          },
        });

      /**
       * Total count
       */
      const total =
        await prisma.auditLog.count({
          where: filters,
        });

      /**
       * Audit access logging
       * Non-blocking
       */
      createAuditLog(
        "VIEW_AUDIT_LOGS",
        req.user!.userId
      ).catch(console.error);

      /**
       * Success response
       */
      return res.status(200).json({
        success: true,
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(
          total / limitNumber
        ),
        count: logs.length,
        logs,
      });
    } catch (error) {
      console.error(
        "[GET_AUDIT_LOGS_ERROR]",
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      next(error);
    }
  }
);

export default router;

// router.get(
//   "/",
//   protect,
//   authorizeRoles("ADMIN"),
//   async (req: AuthRequest,
//          res: Response,
//          next: NextFunction
//     ) => {
//     try {
//       const logs =
//         await prisma.auditLog.findMany({
//           orderBy: {
//             createdAt: "desc",
//           },
//         });

//       return res.status(200).json({
//         success: true,
//         count: logs.length,
//         logs,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// export default router;