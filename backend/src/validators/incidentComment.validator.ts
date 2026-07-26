import { z } from "zod";

export const createIncidentCommentSchema = z
  .object({
    comment: z
      .string()
      .trim()
      .min(1, "Comment is required")
      .max(5000, "Comment cannot exceed 5000 characters"),
  })
  .strict();