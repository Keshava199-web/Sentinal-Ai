import { db, PrismaExecutor } from "../database/prisma";

const incidentIOCRelations = {
  ioc: {
    select: {
      id: true,
      type: true,
      value: true,
      severity: true,
      confidence: true,
      status: true,
      source: true,
    },
  },
  linkedBy: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

const incidentRelations = {
  incident: {
    select: {
      id: true,
      title: true,
      severity: true,
      status: true,
      createdAt: true,
    },
  },
  linkedBy: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

type LinkIOCRepositoryInput = {
  incidentId: string;
  iocId: string;
  linkedById: string;
  notes?: string;
};

export const createIncidentIOCRepository = async (
  data: LinkIOCRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentIOC.create({
    data: {
      incidentId: data.incidentId,
      iocId: data.iocId,
      linkedById: data.linkedById,

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
    },

    include: incidentIOCRelations,
  });
};

export const getIncidentIOCsRepository = async (
  incidentId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentIOC.findMany({
    where: {
      incidentId,
    },

    include: incidentIOCRelations,

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getIOCIncidentsRepository = async (
  iocId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentIOC.findMany({
    where: {
      iocId,
    },

    include: incidentRelations,

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getIncidentIOCLinkRepository = async (
  incidentId: string,
  iocId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentIOC.findUnique({
    where: {
      incidentId_iocId: {
        incidentId,
        iocId,
      },
    },
  });
};

export const unlinkIOCRepository = async (
  incidentId: string,
  iocId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentIOC.delete({
    where: {
      incidentId_iocId: {
        incidentId,
        iocId,
      },
    },
  });
};

