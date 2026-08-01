import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5)
    .max(150),

  description: z
    .string()
    .trim()
    .min(10)
    .max(5000),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  sourceIp: z
  .string()
  .trim()
  .ip({
    version: "v4",
    message: "Invalid IPv4 address",
  })
  .optional()
  .or(z.literal("")),
});

export type CreateIncidentFormValues =
  z.infer<typeof createIncidentSchema>;

/**
 * =========================================================
 * UPDATE INCIDENT
 * =========================================================
 */

export const updateIncidentSchema = z.object({
  status: z.enum([
    "OPEN",
    "INVESTIGATING",
    "RESOLVED",
    "CLOSED",
  ]),
});

export type UpdateIncidentFormValues =
  z.infer<typeof updateIncidentSchema>;