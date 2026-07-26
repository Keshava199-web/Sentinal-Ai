import { TimelineAction } from "@prisma/client";

import { withTransaction } from "../database/transaction";

import {
  createTimelineEntryRepository,
} from "../repositories/incidentTimeline.repository";

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
  return withTransaction(async (tx) => {
    /**
     * Verify incident exists
     */
    const incident =
      await getIncidentByIdRepository(
        data.incidentId,
        tx,
      );

    if (!incident) {
      throw new NotFoundError("Incident not found");
    }

    /**
     * Create comment
     */
    const comment =
      await createIncidentCommentRepository(
        data,
        tx,
      );

    /**
     * Timeline
     */
    await createTimelineEntryRepository(
      {
        incidentId: data.incidentId,
        userId: data.userId,
        action: TimelineAction.COMMENT_ADDED,
        description: "Comment added",
        metadata: {
          commentId: comment.id,
        },
      },
      tx,
    );

    return comment;
  });
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
    throw new NotFoundError("Incident not found");
  }

  return getIncidentCommentsRepository(
    incidentId,
  );
};