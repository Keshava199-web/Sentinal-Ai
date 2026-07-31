import { z } from "zod";

/**
 * =========================================================
 * Link IOC to Incident
 * =========================================================
 */
export const linkIncidentIOCSchema = z
  .object({
    incidentId: z.string().uuid("Invalid incident ID"),
    iocId: z.string().uuid("Invalid IOC ID"),
    notes: z
      .string()
      .trim()
      .max(500, "Notes must not exceed 500 characters")
      .optional(),
  })
  .strict();

/**
 * =========================================================
 * Get IOCs for an Incident
 * =========================================================
 */
export const getIncidentIOCsSchema = z
  .object({
    incidentId: z.string().uuid("Invalid incident ID"),
  })
  .strict();

/**
 * =========================================================
 * Get Incidents for an IOC
 * =========================================================
 */
export const getIOCIncidentsSchema = z
  .object({
    iocId: z.string().uuid("Invalid IOC ID"),
  })
  .strict();

/**
 * =========================================================
 * Unlink IOC from Incident
 * =========================================================
 */
export const unlinkIncidentIOCSchema = z
  .object({
    incidentId: z.string().uuid("Invalid incident ID"),
    iocId: z.string().uuid("Invalid IOC ID"),
  })
  .strict();