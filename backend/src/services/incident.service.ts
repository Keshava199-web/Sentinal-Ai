import {
  IncidentSeverity,
  IncidentStatus,
  Role,
  TimelineAction,
} from "@prisma/client";

// import { createTimelineEntryService } from "./incidentTimeline.service";
import { createTimelineEntryRepository } from "../repositories/incidentTimeline.repository";

import { withTransaction } from "../database/transaction";

import {
  createIncidentRepository,
  getIncidentsRepository,
  getIncidentByIdRepository,
  updateIncidentStatusRepository,
  deleteIncidentRepository,
  assignIncidentRepository,
  findUserByIdRepository,
} from "../repositories/incident.repository";

import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { BadRequestError } from "../errors/BadRequestError";

/**
 * Create Incident
 */
export const createIncidentService = async (
  title: string,
  description: string,
  severity: IncidentSeverity,
  sourceIp: string | undefined,
  reporterId: string,
) => {
return withTransaction(async (tx) => {
  const incident = await createIncidentRepository(
    {
      title,
      description,
      severity,
      sourceIp,
      reporterId,
    },
    tx,
  );

  await createTimelineEntryRepository(
    {
      incidentId: incident.id,
      userId: reporterId,
      action: TimelineAction.CREATED,
      description: `Incident "${incident.title}" created`,
    },
    tx,
  );

  return incident;
});
};

/**
 * Get All Incidents
 */
export const getIncidentsService = async (
  skip: number,
  limit: number,
) => {
  return getIncidentsRepository(skip, limit);
};

/**
 * Get Incident By ID
 */
export const getIncidentByIdService = async (
  id: string,
) => {
  return getIncidentByIdRepository(id);
};

/**
 * Update Incident Status
 */
export const updateIncidentStatusService = async (
  id: string,
  status: IncidentStatus,
) => {
  return withTransaction(async (tx) => {
    const incident = await getIncidentByIdRepository(id, tx);

    if (!incident) {
      throw new NotFoundError("Incident not found");
    }

    const previousStatus = incident.status;

    if (previousStatus === status) {
      throw new ConflictError(
        "Incident already has this status",
      );
    }

    const updatedIncident =
      await updateIncidentStatusRepository(
        id,
        status,
        tx,
      );

    await createTimelineEntryRepository(
      {
        incidentId: id,
        action: TimelineAction.STATUS_CHANGED,
        description: `Status changed from ${previousStatus} to ${status}`,
        metadata: {
          previousStatus,
          newStatus: status,
        },
      },
      tx,
    );

    return updatedIncident;
  });
};

/**
 * Delete Incident
 */
export const deleteIncidentService = async (
  id: string,
) => {
  return deleteIncidentRepository(id);
};

/**
 * Assign Incident
 */
export const assignIncidentService = async (
  incidentId: string,
  assignedToId: string,
) => {
  return withTransaction(async (tx) => {
    const incident = await getIncidentByIdRepository(
      incidentId,
      tx,
    );

    if (!incident) {
      throw new NotFoundError("Incident not found");
    }

    if (incident.status === IncidentStatus.CLOSED) {
      throw new ConflictError(
        "Closed incidents cannot be assigned",
      );
    }

    if (incident.assignedToId === assignedToId) {
      throw new ConflictError(
        "Incident is already assigned to this analyst",
      );
    }

    const analyst = await findUserByIdRepository(
      assignedToId,
      tx,
    );

    if (!analyst) {
      throw new NotFoundError("Analyst not found");
    }

    if (analyst.role !== Role.ANALYST) {
      throw new BadRequestError(
        "User is not an analyst",
      );
    }

    const updatedIncident =
      await assignIncidentRepository(
        incidentId,
        assignedToId,
        tx,
      );

    await createTimelineEntryRepository(
      {
        incidentId,
        userId: assignedToId,
        action: TimelineAction.ASSIGNED,
        description: `Assigned to ${analyst.email}`,
        metadata: {
          assignedToId,
          analystEmail: analyst.email,
        },
      },
      tx,
    );

    return updatedIncident;
  });
};