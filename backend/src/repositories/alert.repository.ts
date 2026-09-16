import { AlertStatus, Prisma } from "@prisma/client";

import { db, PrismaExecutor } from "../database/prisma";

const alertRelations = {
  incident: {
    select: {
      id: true,
      title: true,
      severity: true,
      status: true,
    },
  },

  assignedTo: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} satisfies Prisma.AlertInclude;

type CreateAlertRepositoryInput = {
  title: string;
  description?: string;

  severity: Prisma.AlertCreateInput["severity"];
  status?: AlertStatus;

  source: Prisma.AlertCreateInput["source"];
  sourceEventId?: string;

  incidentId?: string;
  assignedToId?: string;

  detectedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
};

export const createAlertRepository = async (
  data: CreateAlertRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.create({
    data: {
      title: data.title,

      ...(data.description !== undefined && {
        description: data.description,
      }),

      severity: data.severity,

      ...(data.status !== undefined && {
        status: data.status,
      }),

      source: data.source,

      ...(data.sourceEventId !== undefined && {
        sourceEventId: data.sourceEventId,
      }),

      ...(data.incidentId !== undefined && {
        incidentId: data.incidentId,
      }),

      ...(data.assignedToId !== undefined && {
        assignedToId: data.assignedToId,
      }),

      detectedAt: data.detectedAt,

      ...(data.acknowledgedAt !== undefined && {
        acknowledgedAt: data.acknowledgedAt,
      }),

      ...(data.resolvedAt !== undefined && {
        resolvedAt: data.resolvedAt,
      }),
    },

    include: alertRelations,
  });
};

export const getAlertsRepository = async (
  skip: number,
  take: number,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.findMany({
    skip,
    take,

    include: alertRelations,

    orderBy: {
      detectedAt: "desc",
    },
  });
};

export const getAlertByIdRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.findUnique({
    where: {
      id,
    },

    include: alertRelations,
  });
};

type UpdateAlertRepositoryInput = {
  title?: string;
  description?: string;

  severity?: Prisma.AlertUpdateInput["severity"];
  status?: AlertStatus;

  assignedToId?: string | null;
  incidentId?: string | null;

  acknowledgedAt?: Date | null;
  resolvedAt?: Date | null;
};

export const updateAlertRepository = async (
  id: string,
  data: UpdateAlertRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.update({
    where: {
      id,
    },

    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.severity !== undefined && {
        severity: data.severity,
      }),

      ...(data.status !== undefined && {
        status: data.status,
      }),

      ...(data.assignedToId !== undefined && {
        assignedToId: data.assignedToId,
      }),

      ...(data.incidentId !== undefined && {
        incidentId: data.incidentId,
      }),

      ...(data.acknowledgedAt !== undefined && {
        acknowledgedAt: data.acknowledgedAt,
      }),

      ...(data.resolvedAt !== undefined && {
        resolvedAt: data.resolvedAt,
      }),
    },

    include: alertRelations,
  });
};

export const deleteAlertRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.delete({
    where: {
      id,
    },
  });
};

export const getAlertsByIncidentRepository = async (
  incidentId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.findMany({
    where: {
      incidentId,
    },

    include: alertRelations,

    orderBy: {
      detectedAt: "desc",
    },
  });
};

export const getAlertsByAssigneeRepository = async (
  assignedToId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.alert.findMany({
    where: {
      assignedToId,
    },

    include: alertRelations,

    orderBy: {
      detectedAt: "desc",
    },
  });
};