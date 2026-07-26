import { TimelineAction } from "@prisma/client";

import { createTimelineEntryService } from "./incidentTimeline.service";

import {
  getIncidentByIdRepository,
} from "../repositories/incident.repository";

import {
  createIncidentCommentRepository,
  getIncidentCommentsRepository,
} from "../repositories/incidentComment.repository";
import { NotFoundError } from "../errors/NotFoundError";

type CreateIncidentCommentServiceInput = {
  incidentId: string;
  userId: string;
  comment: string;
};

/**
 * Create Comment
 */
export const createIncidentCommentService = async (
  data: CreateIncidentCommentServiceInput,
) => {
  /**
   * Verify incident exists
   */
  const incident = await getIncidentByIdRepository(
    data.incidentId,
  );

  if (!incident) {
    throw new NotFoundError("Incident not found");
  }

  /**
   * Create comment
   */
  const comment =
    await createIncidentCommentRepository(data);

  /**
   * Create timeline entry
   */
  await createTimelineEntryService({
    incidentId: data.incidentId,
    userId: data.userId,
    action: TimelineAction.COMMENT_ADDED,
    description: "Comment added",
    metadata: {
      commentId: comment.id,
    },
  });

  return comment;
};

/**
 * Get Incident Comments
 */
export const getIncidentCommentsService = async (
  incidentId: string,
) => {
  /**
   * Verify incident exists
   */
  const incident = await getIncidentByIdRepository(
    incidentId,
  );

  if (!incident) {
    throw new Error("Incident not found");
  }

  return getIncidentCommentsRepository(
    incidentId,
  );
};