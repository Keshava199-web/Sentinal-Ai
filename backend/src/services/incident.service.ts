import {
  IncidentSeverity,
  IncidentStatus,
  Role,
} from "@prisma/client";

import {
  createIncidentRepository,
  getIncidentsRepository,
  getIncidentByIdRepository,
  updateIncidentStatusRepository,
  deleteIncidentRepository,
  assignIncidentRepository,
  findUserByIdRepository,
} from "../repositories/incident.repository";

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
  return createIncidentRepository(
    title,
    description,
    severity,
    sourceIp,
    reporterId,
  );
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
  return updateIncidentStatusRepository(id, status);
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
  /**
   * Verify incident exists
   */
  const incident = await getIncidentByIdRepository(incidentId);

  if (!incident) {
    throw new Error("Incident not found");
  }

  /**
   * Closed incidents cannot be reassigned
   */
  if (incident.status === IncidentStatus.CLOSED) {
    throw new Error("Closed incidents cannot be assigned");
  }

  /**
   * Verify analyst exists
   */
  const analyst = await findUserByIdRepository(assignedToId);

  if (!analyst) {
    throw new Error("Analyst not found");
  }

  /**
   * Only analysts can be assigned incidents
   */
  if (analyst.role !== Role.ANALYST) {
    throw new Error("User is not an analyst");
  }

  /**
   * Assign incident
   */
  return assignIncidentRepository(
    incidentId,
    assignedToId,
  );
};