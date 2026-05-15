import {
  Router,
  Response,
  NextFunction,
} from "express";

import prisma from "../config/prisma";

import {
  protect,
  AuthRequest,
} from "../middleware/auth.middleware";

import {
  authorizeRoles,
} from "../middleware/role.middleware";

import {
  createAuditLog,
} from "../utils/auditLogger";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Security audit trail APIs
 */

/**
 * @swagger
 * /audit:
 *   get:
 *     summary: Get audit logs
 *     tags:
 *       - Audit Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 20
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         example: DELETE_INCIDENT
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Audit logs fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN"),
  async (
    req: AuthRequest,
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
       * Safe pagination
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
       * Filters
       */
      const filters: {
        action?: string;
        userId?: string;
      } = {};

      /**
       * Action filter
       */
      if (
        typeof action === "string" &&
        action.trim()
      ) {
        filters.action =
          action.trim().toUpperCase();
      }

      /**
       * User filter
       */
      if (
        typeof userId === "string" &&
        userId.trim()
      ) {
        filters.userId =
          userId.trim();
      }

      /**
       * Fetch logs
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
       * Track audit access
       */
      createAuditLog(
        "VIEW_AUDIT_LOGS",
        req.user!.userId
      ).catch(console.error);

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