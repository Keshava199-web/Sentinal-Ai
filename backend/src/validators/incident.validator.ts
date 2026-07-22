import { z } from "zod";

/**
 * Shared Incident Severity Enum
 */
export const IncidentSeverity = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

/**
 * Create incident schema
 */
export const createIncidentSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "Title too short")
      .max(150, "Title too long"),

    description: z
      .string()
      .trim()
      .min(10, "Description too short")
      .max(5000, "Description too long"),

    severity: z.enum(IncidentSeverity),

    sourceIp: z
      .string()
      .trim()
      .min(7)
      .max(45)
      .regex(
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
        "Invalid IP address",
      )
      .optional(),
  })
  .strict();

/**
 * Update incident schema
 */
export const updateIncidentSchema = z
  .object({
    status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED",]),
  })
  .strict();

export const incidentQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Page must be a positive integer",
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine((val) => Number.isInteger(val) && val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100",
    }),

  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),

  status: z.enum(["OPEN", "INVESTIGATING", "RESOLVED", "CLOSED"]).optional(),

  search: z.string().trim().max(100).optional(),
})
.strict();

export const incidentIdParamSchema = z.object({
  id: z.uuid({
    message: "Invalid incident ID format",
  }),
});

/**
 * Assign Incident Schema
 */
export const assignIncidentSchema = z
  .object({
    assignedToId: z.uuid({
      message: "Invalid analyst ID format",
    }),
  })
  .strict();