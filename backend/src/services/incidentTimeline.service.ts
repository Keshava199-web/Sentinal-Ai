import {
  Prisma,
  TimelineAction,
} from "@prisma/client";

import {
  createTimelineEntryRepository,
  getIncidentTimelineRepository,
} from "../repositories/incidentTimeline.repository";

import { getIncidentByIdRepository } from "../repositories/incident.repository";

type CreateTimelineEntryServiceInput = {
  incidentId: string;
  userId?: string;
  action: TimelineAction;
  description: string;
  metadata?: Prisma.InputJsonValue;
};

/**
 * Create Timeline Entry
 */
export const createTimelineEntryService = async (
  data: CreateTimelineEntryServiceInput,
) => {
  /**
   * Verify incident exists
   */
  const incident = await getIncidentByIdRepository(data.incidentId);

  if (!incident) {
    throw new Error("Incident not found");
  }

  /**
   * Create timeline entry
   */
  return createTimelineEntryRepository(data);
};

/**
 * Get Timeline
 */
export const getIncidentTimelineService = async (
  incidentId: string,
) => {
  /**
   * Verify incident exists
   */
  const incident = await getIncidentByIdRepository(incidentId);

  if (!incident) {
    throw new Error("Incident not found");
  }

  /**
   * Fetch timeline
   */
  return getIncidentTimelineRepository(incidentId);
};