import {
  IncidentSeverity,
  IncidentStatus,
} from "@prisma/client";

import prisma from "../config/prisma";

/**
 * Shared Incident Relations
 * Prevents exposing sensitive user fields
 */
const incidentRelations = {
  reporter: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
  assignedTo: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

/**
 * Create Incident
 */
type CreateIncidentRepositoryInput = {
  title: string;
  description: string;
  severity: IncidentSeverity;
  sourceIp: string | undefined;
  reporterId: string;
};

export const createIncidentRepository = async (
  data: CreateIncidentRepositoryInput,
) => {
  return prisma.incident.create({
    data: {
      title: data.title,
      description: data.description,
      severity: data.severity,
      sourceIp: data.sourceIp ?? null,
      reporter: {
        connect: {
          id: data.reporterId,
        },
      },
    },
    include: incidentRelations,
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
    include: incidentRelations,
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
    include: incidentRelations,
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
     select: {
        id: true,
        email: true,
        role: true,
    },
  });
};

/**
 * Assign Incident
 */
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
    },
    include: incidentRelations,
  });
};