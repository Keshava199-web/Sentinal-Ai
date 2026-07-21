import {
  Response,
  NextFunction,
} from "express";

// import prisma from "../config/prisma";

import { Request } from "express";

import {
  createAuditLog,
} from "../utils/auditLogger";

import {
  createIncidentService,
  getIncidentsService,
  getIncidentByIdService,
  updateIncidentStatusService,
  deleteIncidentService,
} from "../services/incident.service";


/**
 * Safely extract route param
 */
const getRouteParam = (
  value: unknown
): string | undefined => {
  if (
    typeof value === "string" &&
    value.trim().length > 0
  ) {
    return value.trim();
  }

  return undefined;
};

/**
 * UUID validation
 */
const isUuid = (
  value: string
): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
};

/**
 * Create Incident
 */
export const createIncident =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Auth guard
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      /**
       * Extract validated body
       */
      const {
        title,
        description,
        severity,
        sourceIp,
      } = req.body;

      /**
       * Create incident
       */
      const incident =
        await createIncidentService(
          title,
          description,
          severity,
          sourceIp
        );

      /**
       * Audit log
       */
      createAuditLog(
        "INCIDENT_CREATED",
        req.user.userId,
        incident.id
      ).catch(console.error);

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
 * Get Incidents
 */
export const getIncidents =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Auth Guard
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
    }
      /**
       * Query params
       */
      const {
        page = "1",
        limit = "10",
      } = req.query;

      /**
       * Safe pagination
       */
      const pageNumber =
        Math.max(
          Number(page),
          1
        );

      const limitNumber =
        Math.min(
          Math.max(
            Number(limit),
            1
          ),
          100
        );

      const skip =
        (pageNumber - 1) *
        limitNumber;

      /**
       * Fetch incidents
       */
      const incidents =
        await getIncidentsService(
          skip,
          limitNumber
        );

      /**
       * Audit log
       */
      createAuditLog(
        "VIEW_INCIDENTS",
        req.user.userId
      ).catch(console.error);

      /**
       * Success response
       */
      return res.status(200).json({
        success: true,
        page: pageNumber,
        limit: limitNumber,
        count:
          incidents.length,
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
 * Get Incident By ID
 */
export const getIncidentById =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /**
       * Extract ID
       */
      const id =
        typeof req.params.id === "string"
          ? req.params.id
          : undefined;

          if (!id) {
            return res.status(400).json({
              success: false,
              message: "Invalid incident ID",
            });
          }

      /**
       * Find incident
       */
      const incident =
        await getIncidentByIdService(
          id
        );

      /**
       * Incident not found
       */
      if (!incident) {
        return res.status(404).json({
          success: false,
          message:
            "Incident not found",
        });
      }

      /**
       * Audit log
       */
      createAuditLog(
        "VIEW_INCIDENT",
        req.user!.userId,
        incident.id
      ).catch(console.error);

      /**
       * Success response
       */
      return res.status(200).json({
        success: true,
        incident,
      });
    } catch (error) {
      console.error(
        "[GET_INCIDENT_ERROR]",
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
export const updateIncidentStatus =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /**
       * Extract params
       */
      const rawId = getRouteParam(
        req.params.id
      );

      if (
        !rawId ||
        !isUuid(rawId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid incident ID",
        });
      }

const id: string = rawId;

      const { status } =
        req.body;

      /**
       * Check existing incident
       */
      const existingIncident =
        await getIncidentByIdService(
          id
        );

      /**
       * Incident not found
       */
      if (!existingIncident) {
        return res.status(404).json({
          success: false,
          message:
            "Incident not found",
        });
      }

      /**
       * Update incident
       */
      const updatedIncident =
        await updateIncidentStatusService(
          id,
          status
        );

      /**
       * Audit log
       */
      createAuditLog(
        "INCIDENT_UPDATED",
        req.user!.userId,
        updatedIncident.id
      ).catch(console.error);

      /**
       * Success response
       */
      return res.status(200).json({
        success: true,
        message:
          "Incident updated successfully",
        incident:
          updatedIncident,
      });
    } catch (error) {
      console.error(
        "[UPDATE_INCIDENT_ERROR]",
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
export const deleteIncident =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /**
       * Extract ID
       */
      const rawId = getRouteParam(
        req.params.id
      );

      if (
        !rawId ||
        !isUuid(rawId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid incident ID",
        });
      }

const id: string = rawId;

      /**
       * Check existing incident
       */
      const existingIncident =
        await getIncidentByIdService(
          id
        );

      /**
       * Incident not found
       */
      if (!existingIncident) {
        return res.status(404).json({
          success: false,
          message:
            "Incident not found",
        });
      }

      /**
       * Delete incident
       */
      await deleteIncidentService(
        id
      );

      /**
       * Audit log
       */
      createAuditLog(
        "INCIDENT_DELETED",
        req.user!.userId,
        id
      ).catch(console.error);

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