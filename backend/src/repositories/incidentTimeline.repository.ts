import {
  Prisma,
  TimelineAction,
} from "@prisma/client";

import {
  db,
  PrismaExecutor,
} from "../database/prisma";

type CreateTimelineEntryRepositoryInput = {
  incidentId: string;
  userId?: string;
  action: TimelineAction;
  description: string;
  metadata?: Prisma.InputJsonValue;
};

const timelineRelations = {
  user: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

/**
 * Create Timeline Entry
 */
export const createTimelineEntryRepository = async (
  data: CreateTimelineEntryRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentTimeline.create({
    data: {
      incidentId: data.incidentId,
      userId: data.userId ?? null,
      action: data.action,
      description: data.description,
      ...(data.metadata !== undefined && {
        metadata: data.metadata,
      }),
    },
  });
};

/**
 * Get Incident Timeline
 */
export const getIncidentTimelineRepository = async (
  incidentId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentTimeline.findMany({
    where: {
      incidentId,
    },
    include: timelineRelations,
    orderBy: {
      createdAt: "asc",
    },
  });
};