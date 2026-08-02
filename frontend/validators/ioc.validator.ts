import { z } from "zod";

import {
  IOC_TYPES,
  IOC_SEVERITIES,
  IOC_STATUSES,
  IOC_SOURCES,
} from "@/types/ioc";

/**
 * =========================================================
 * CREATE IOC
 * =========================================================
 */

export const createIOCSchema = z.object({
  type: z.enum(IOC_TYPES),

  value: z
    .string()
    .trim()
    .min(2, "IOC value is required.")
    .max(500, "IOC value is too long."),

  description: z
    .string()
    .trim()
    .max(5000, "Description is too long.")
    .optional()
    .or(z.literal("")),

  severity: z.enum(IOC_SEVERITIES),

  confidence: z
    .number({
      invalid_type_error: "Confidence must be a number.",
    })
    .min(0, "Confidence cannot be less than 0.")
    .max(100, "Confidence cannot exceed 100."),

  firstSeen: z
    .string()
    .optional()
    .or(z.literal("")),

  lastSeen: z
    .string()
    .optional()
    .or(z.literal("")),

  source: z.enum(IOC_SOURCES),
});

export type CreateIOCFormValues =
  z.infer<typeof createIOCSchema>;

/**
 * =========================================================
 * UPDATE IOC
 * =========================================================
 */

export const updateIOCSchema = z.object({
  description: z
    .string()
    .trim()
    .max(5000, "Description is too long.")
    .optional()
    .or(z.literal("")),

  severity: z.enum(IOC_SEVERITIES),

  status: z.enum(IOC_STATUSES),

  confidence: z
    .number({
      invalid_type_error: "Confidence must be a number.",
    })
    .min(0, "Confidence cannot be less than 0.")
    .max(100, "Confidence cannot exceed 100."),

  firstSeen: z
    .string()
    .optional()
    .or(z.literal("")),

  lastSeen: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type UpdateIOCFormValues =
  z.infer<typeof updateIOCSchema>;