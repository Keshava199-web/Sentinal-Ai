import { z } from "zod";

import {
  IOCSeverity,
  IOCSource,
  IOCType,
} from "@prisma/client";

/**
 * Create IOC
 */
export const createIOCSchema = z.object({
  body: z.object({
    type: z.nativeEnum(IOCType),

    value: z
      .string()
      .trim()
      .min(1, "IOC value is required")
      .max(2048, "IOC value is too long"),

    description: z
      .string()
      .trim()
      .max(2000, "Description is too long")
      .optional(),

    severity: z.nativeEnum(IOCSeverity),

    confidence: z
        .number()
        .int()
        .min(0, "Confidence must be at least 0")
        .max(100, "Confidence cannot exceed 100"),

    source: z.nativeEnum(IOCSource),
  }),
});

/**
 * Get IOC By ID
 */
export const getIOCByIdSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid IOC ID"),
  }),
});

/**
 * Delete IOC
 */
export const deleteIOCSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid IOC ID"),
  }),
});

/**
 * Get IOC List
 */
export const getIOCsSchema = z.object({
  query: z.object({
    page: z
      .coerce
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z
      .coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(10),
  }),
});