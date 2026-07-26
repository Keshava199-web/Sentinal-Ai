import { z } from "zod";

export const createTimelineEntrySchema = z
  .object({
    action: z.enum([
      "CREATED",
      "ASSIGNED",
      "STATUS_CHANGED",
      "COMMENT_ADDED",
      "EVIDENCE_UPLOADED",
      "REOPENED",
      "CLOSED",
    ]),

    description: z
      .string()
      .trim()
      .min(5)
      .max(500),

    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const incidentTimelineParamSchema = z.object({
  id: z.uuid({
    message: "Invalid incident ID",
  }),
});