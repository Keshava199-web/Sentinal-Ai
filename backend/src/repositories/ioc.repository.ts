import {
  IOCType,
  IOCSeverity,
  IOCSource,
} from "@prisma/client";

import {
  db,
  PrismaExecutor,
} from "../database/prisma";

const iocRelations = {
  createdBy: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

type CreateIOCRepositoryInput = {
  type: IOCType;
  value: string;
  description?: string;
  severity: IOCSeverity;
  confidence: number;
  source: IOCSource;
  createdById: string;
};

export const createIOCRepository = async (
  data: CreateIOCRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.iOC.create({
    data: {
        type: data.type,
        value: data.value,
        description: data.description ?? null,
        severity: data.severity,
        confidence: data.confidence,
        source: data.source,
        createdBy: {
            connect: {
                id: data.createdById,
            },
        },
    },
    include: iocRelations,
  });
};

export const getIOCByIdRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.iOC.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    include: iocRelations,
  });
};

export const findDuplicateIOCRepository = async (
  type: IOCType,
  value: string,
  source: IOCSource,
  tx: PrismaExecutor = db,
) => {
  return tx.iOC.findFirst({
    where: {
      type,
      value,
      source,
      deletedAt: null,
    },
  });
};

export const getIOCsRepository = async (
  skip: number,
  limit: number,
  tx: PrismaExecutor = db,
) => {
  return tx.iOC.findMany({
    where: {
      deletedAt: null,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: iocRelations,
  });
};

export const softDeleteIOCRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.iOC.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};