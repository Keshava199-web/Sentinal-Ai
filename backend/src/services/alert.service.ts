import {
  AlertStatus,
  IncidentSeverity,
} from "@prisma/client";

import { withTransaction } from "../database/transaction";

import {
  createAlertRepository,
  getAlertsRepository,
  getAlertByIdRepository,
  updateAlertRepository,
  deleteAlertRepository,
  getAlertsByIncidentRepository,
  getAlertsByAssigneeRepository,
} from "../repositories/alert.repository";

import { getIncidentByIdRepository } from "../repositories/incident.repository";

import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";

type CreateAlertServiceInput = {
  title: string;
  description?: string;
  severity: IncidentSeverity;
  source: Parameters<typeof createAlertRepository>[0]["source"];
  sourceEventId?: string;
  incidentId?: string;
  assignedToId?: string;
  detectedAt: Date;
};

type UpdateAlertServiceInput = {
  title?: string;
  description?: string;
  severity?: IncidentSeverity;
  status?: AlertStatus;
  assignedToId?: string | null;
  incidentId?: string | null;
  acknowledgedAt?: Date | null;
  resolvedAt?: Date | null;
};

/**
 * Create Alert
 */
export const createAlertService = async (
  input: CreateAlertServiceInput,
) => {
  return withTransaction(async (tx) => {
    /**
     * If an incident is supplied, verify that it exists.
     */
    if (input.incidentId) {
      const incident = await getIncidentByIdRepository(
        input.incidentId,
        tx,
      );

      if (!incident) {
        throw new NotFoundError("Incident not found");
      }
    }

    return createAlertRepository(input, tx);
  });
};

/**
 * Get Alerts
 */
export const getAlertsService = async (
  skip: number,
  limit: number,
) => {
  return getAlertsRepository(skip, limit);
};

/**
 * Get Alert By ID
 */
export const getAlertByIdService = async (
  id: string,
) => {
  return getAlertByIdRepository(id);
};

/**
 * Update Alert
 */
export const updateAlertService = async (
  id: string,
  input: UpdateAlertServiceInput,
) => {
  return withTransaction(async (tx) => {
    const alert = await getAlertByIdRepository(id, tx);

    if (!alert) {
      throw new NotFoundError("Alert not found");
    }

    /**
     * Prevent modification of a closed alert.
     */
    if (alert.status === AlertStatus.CLOSED) {
      throw new ConflictError(
        "Closed alerts cannot be modified",
      );
    }

    /**
     * Validate referenced incident if supplied.
     *
     * null intentionally means unlink the alert
     * from its current incident.
     */
    if (input.incidentId) {
      const incident = await getIncidentByIdRepository(
        input.incidentId,
        tx,
      );

      if (!incident) {
        throw new NotFoundError("Incident not found");
      }
    }

    /**
     * Avoid meaningless status updates.
     */
    if (
      input.status !== undefined &&
      input.status === alert.status
    ) {
      throw new ConflictError(
        `Alert already has status ${input.status}`,
      );
    }

    /**
     * Automatically maintain timestamps based
     * on lifecycle transitions.
     */
    const updateData: UpdateAlertServiceInput = {
      ...input,
    };

    if (
      input.status === AlertStatus.ACKNOWLEDGED &&
      input.acknowledgedAt === undefined
    ) {
      updateData.acknowledgedAt = new Date();
    }

    if (
      input.status === AlertStatus.RESOLVED &&
      input.resolvedAt === undefined
    ) {
      updateData.resolvedAt = new Date();
    }

    return updateAlertRepository(
      id,
      updateData,
      tx,
    );
  });
};

/**
 * Delete Alert
 */
export const deleteAlertService = async (
  id: string,
) => {
  const alert = await getAlertByIdRepository(id);

  if (!alert) {
    throw new NotFoundError("Alert not found");
  }

  return deleteAlertRepository(id);
};

/**
 * Get Alerts For Incident
 */
export const getAlertsByIncidentService = async (
  incidentId: string,
) => {
  const incident = await getIncidentByIdRepository(
    incidentId,
  );

  if (!incident) {
    throw new NotFoundError("Incident not found");
  }

  return getAlertsByIncidentRepository(incidentId);
};

/**
 * Get Alerts Assigned To User
 */
export const getAlertsByAssigneeService = async (
  assignedToId: string,
) => {
  return getAlertsByAssigneeRepository(assignedToId);
};