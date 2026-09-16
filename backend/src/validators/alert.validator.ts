import { z } from "zod";
import {
  AlertStatus,
  DetectionSource,
  IncidentSeverity,
} from "@prisma/client";

/**
 * Create Alert
 */
export const createAlertSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Alert title is required")
    .max(255, "Alert title is too long"),

  description: z
    .string()
    .trim()
    .max(5000, "Alert description is too long")
    .optional(),

  severity: z.enum(IncidentSeverity),

  source: z.enum(DetectionSource),

  sourceEventId: z
    .string()
    .trim()
    .min(1, "Source event ID cannot be empty")
    .max(255, "Source event ID is too long")
    .optional(),

  incidentId: z
    .uuid("Invalid incident ID")
    .optional(),

  assignedToId: z
    .uuid("Invalid assignee ID")
    .optional(),

  detectedAt: z.coerce.date({
    error: "Invalid detection timestamp",
  }),
});

/**
 * Get Alert By ID
 */
export const getAlertByIdSchema = z.object({
  id: z.uuid("Invalid alert ID"),
});

/**
 * Delete Alert
 */
export const deleteAlertSchema = z.object({
  id: z.uuid("Invalid alert ID"),
});

/**
 * Get Alerts By Incident
 */
export const getAlertsByIncidentSchema = z.object({
  incidentId: z.uuid("Invalid incident ID"),
});

/**
 * Get Alerts By Assignee
 */
export const getAlertsByAssigneeSchema = z.object({
  userId: z.uuid("Invalid user ID"),
});

/**
 * Get Alert List
 */
export const getAlertsSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),
});

/**
 * Update Alert
 */
export const updateAlertSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Alert title cannot be empty")
    .max(255, "Alert title is too long")
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000, "Alert description is too long")
    .optional(),

  severity: z
    .enum(IncidentSeverity)
    .optional(),

  status: z
    .enum(AlertStatus)
    .optional(),

  assignedToId: z
    .uuid("Invalid assignee ID")
    .nullable()
    .optional(),

  incidentId: z
    .uuid("Invalid incident ID")
    .nullable()
    .optional(),

  acknowledgedAt: z
    .coerce
    .date({
      error: "Invalid acknowledgement timestamp",
    })
    .nullable()
    .optional(),

  resolvedAt: z
    .coerce
    .date({
      error: "Invalid resolution timestamp",
    })
    .nullable()
    .optional(),
});