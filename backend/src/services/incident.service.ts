import prisma from "../config/prisma";

/**
 * Create incident
 */
export const createIncidentService =
  async (
    title: string,
    description: string,
    severity: string,
    sourceIp?: string
  ) => {
    return prisma.incident.create({
      data: {
        title,
        description,
        severity,
        sourceIp: sourceIp ?? null,
      },
    });
  };

/**
 * Get incidents
 */
export const getIncidentsService =
  async (
    skip: number,
    limit: number
  ) => {
    return prisma.incident.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  };

/**
 * Get incident by ID
 */
export const getIncidentByIdService =
  async (id: string) => {
    return prisma.incident.findUnique({
      where: { id },
    });
  };

/**
 * Update incident status
 */
export const updateIncidentStatusService =
  async (
    id: string,
    status: string
  ) => {
    return prisma.incident.update({
      where: { id },
      data: { status },
    });
  };

/**
 * Delete incident
 */
export const deleteIncidentService =
  async (id: string) => {
    return prisma.incident.delete({
      where: { id },
    });
  };