import {
  IncidentSeverity,
  IncidentStatus,
} from "@prisma/client";

import prisma from "../config/prisma";

/**
 * Create Incident
 */
export const createIncidentRepository = async (
  title: string,
  description: string,
  severity: IncidentSeverity,
  sourceIp: string | undefined,
  reporterId: string,
) => {
  return prisma.incident.create({
    data: {
      title,
      description,
      severity,
      sourceIp: sourceIp ?? null,
      reporter: {
        connect: {
          id: reporterId,
        },
      },
    },
  });
};

/**
 * Get All Incidents
 */
export const getIncidentsRepository = async (
  skip: number,
  limit: number,
) => {
  return prisma.incident.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reporter: true,
      assignedTo: true,
    },
  });
};

/**
 * Get Incident By ID
 */
export const getIncidentByIdRepository = async (
  id: string,
) => {
  return prisma.incident.findUnique({
    where: {
      id,
    },
    include: {
      reporter: true,
      assignedTo: true,
    },
  });
};

/**
 * Update Incident Status
 */
export const updateIncidentStatusRepository = async (
  id: string,
  status: IncidentStatus,
) => {
  return prisma.incident.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

/**
 * Delete Incident
 */
export const deleteIncidentRepository = async (
  id: string,
) => {
  return prisma.incident.delete({
    where: {
      id,
    },
  });
};

/**
 * Find User By ID
 */
export const findUserByIdRepository = async (
  userId: string,
) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

/**
 * Assign Incident
 */
export const assignIncidentRepository = async (
  incidentId: string,
  assignedToId: string,
) => {
  return prisma.incident.update({
    where: {
      id: incidentId,
    },
    data: {
      assignedToId,
      // assignedAt: new Date(), // Enable after schema migration
    },
    include: {
      reporter: true,
      assignedTo: true,
    },
  });
};