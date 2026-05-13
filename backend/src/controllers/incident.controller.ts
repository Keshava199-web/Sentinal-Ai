import {
  Request,
  Response,
  NextFunction,
} from "express";

import prisma from "../config/prisma";

import { createAuditLog } from "../utils/auditLogger";
import { AuthRequest } from "../middleware/auth.middleware";
import { Prisma } from "@prisma/client";
    

/**
 * Create Incident
 */
export const createIncident = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      severity,
      sourceIp,
    } = req.body;

    /**
     * Validate input types
     */
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof severity !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input types",
      });
    }

    /**
     * Normalize inputs
     */
    const normalizedTitle =
      title.trim();

    const normalizedDescription =
      description.trim();

    const normalizedSeverity =
      severity.trim().toUpperCase();

    const normalizedSourceIp =
      typeof sourceIp === "string"
        ? sourceIp.trim()
        : undefined;

    /**
     * Basic validation
     */
    if (
      !normalizedTitle ||
      !normalizedDescription ||
      !normalizedSeverity
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description and severity are required",
      });
    }

    /**
     * Title length validation
     */
    if (normalizedTitle.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Title too long",
      });
    }

    /**
     * Description length validation
     */
    if (
      normalizedDescription.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Description too long",
      });
    }

    /**
     * Allowed severity values
     */
    const allowedSeverities = [
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ];

    /**
     * Validate severity
     */
    if (
      !allowedSeverities.includes(
        normalizedSeverity
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid severity",
      });
    }

    /**
     * Create incident
     */
    const incident =
      await prisma.incident.create({
        data: {
          title: normalizedTitle,
          description:
            normalizedDescription,
          severity:
            normalizedSeverity,
          sourceIp:
            normalizedSourceIp,
        },
      });

      await createAuditLog(
        "CREATE_INCIDENT",
        req.user!.userId,
        incident.id
      );

    /**
     * Success response
     */
    return res.status(201).json({
      success: true,
      message:
        "Incident created successfully",
      incident,
    });
  } catch (error) {
    console.error(
      "[CREATE_INCIDENT_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};

/**
 * Get All Incidents
 */
export const getIncidents = async (
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
      limit = "10",
      severity,
      status,
      search,
    } = req.query;

    /**
     * Pagination
     */
    const parsedPage =
      Number(page);

    const parsedLimit =
      Number(limit);

      const pageNumber = Math.max(
        parsedPage,
        1
      );

      const limitNumber = Math.min(
        Math.max(parsedLimit, 1),
        100
      );

      const skip =
        (pageNumber - 1) * limitNumber;

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
     * Build filters
     */
    const filters: Prisma.IncidentWhereInput = {};
    

    /**
     * Severity filter
     */
    if (
      typeof severity === "string"
    ) {
      filters.severity =
        severity.toUpperCase();
    }

    /**
     * Status filter
     */
    if (
      typeof status === "string"
    ) {
      filters.status =
        status.toUpperCase();
    }

    const normalizedSearch =
      typeof search === "string"
        ? search.trim()
        : "";
        
    /**
     * Search filter
     */
    if (
      typeof search === "string" &&
      search.trim()
    ) {
      filters.OR = [
        {
          title: {
            contains: normalizedSearch,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: normalizedSearch,
            mode: "insensitive",
          },
        },
      ];
    }

    /**
     * Fetch incidents
     */
    const incidents =
      await prisma.incident.findMany({
        where: filters,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limitNumber,
      });

    /**
     * Total count
     */
    const total =
      await prisma.incident.count({
        where: filters,
      });

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
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    console.error(
      "[GET_INCIDENTS_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};
/**
 * Get Single Incident
 */
export const getIncidentById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    /**
     * Validate ID
     */
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    /**
     * Find incident
     */
    const incident =
      await prisma.incident.findUnique({
        where: {
          id,
        },
      });

    /**
     * Incident not found
     */
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    /**
     * Success response
     */
    return res.status(200).json({
      success: true,
      incident,
    });
  } catch (error) {
    console.error(
      "[GET_INCIDENT_BY_ID_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};

/**
 * Update Incident Status
 */

export const updateIncidentStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    /**
     * Validate ID
     */
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    /**
     * Validate status type
     */
    if (typeof status !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    /**
     * Normalize status
     */
    const normalizedStatus =
      status.trim().toUpperCase();

    /**
     * Allowed statuses
     */
    const allowedStatuses = [
      "OPEN",
      "INVESTIGATING",
      "RESOLVED",
      "CLOSED",
    ];

    /**
     * Validate status
     */
    if (
      !allowedStatuses.includes(
        normalizedStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    /**
     * Check incident existence
     */
    const existingIncident =
      await prisma.incident.findUnique({
        where: { id },
      });

    if (!existingIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    /**
 * Update incident
 */
const updatedIncident =
  await prisma.incident.update({
    where: { id },
    data: {
      status: normalizedStatus,
    },
  });

await createAuditLog(
  "UPDATE_INCIDENT_STATUS",
  req.user!.userId,
  id
);
/**
 * Success response
 */
return res.status(200).json({
  success: true,
  message:
    "Incident updated successfully",
  incident: updatedIncident,
});
  } catch (error) {
    console.error(
      "[UPDATE_INCIDENT_STATUS_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};

/**
 * Delete Incident
 */
export const deleteIncident = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    
    /**
     * Validate ID
     */
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    /**
     * Check incident existence
     */
    const existingIncident =
      await prisma.incident.findUnique({
        where: { id },
      });

    if (!existingIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    /**
     * Delete incident
     */
    await prisma.incident.delete({
      where: { id },
    });

    await createAuditLog(
        "DELETE_INCIDENT",
        req.user!.userId,
        id
    );

    /**
     * Success response
     */
    return res.status(200).json({
      success: true,
      message:
        "Incident deleted successfully",
    });
  } catch (error) {
    console.error(
      "[DELETE_INCIDENT_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    next(error);
  }
};

