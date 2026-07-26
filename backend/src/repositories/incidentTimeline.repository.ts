import {
  Prisma,
  TimelineAction,
} from "@prisma/client";

import prisma from "../config/prisma";

type CreateTimelineEntryRepositoryInput = {
  incidentId: string;
  userId?: string;
  action: TimelineAction;
  description: string;
  metadata?: Prisma.InputJsonValue;
};

/**
 * Create Timeline Entry
 */
export const createTimelineEntryRepository = async (
  data: CreateTimelineEntryRepositoryInput,
) => {
  return prisma.incidentTimeline.create({
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
) => {
  return prisma.incidentTimeline.findMany({
    where: {
      incidentId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};