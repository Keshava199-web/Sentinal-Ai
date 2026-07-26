import {
  IOCSeverity,
  IOCSource,
  IOCType,
} from "@prisma/client";

import { withTransaction } from "../database/transaction";

import {
  createIOCRepository,
  findDuplicateIOCRepository,
  getIOCByIdRepository,
  getIOCsRepository,
  softDeleteIOCRepository,
} from "../repositories/ioc.repository";

import {
  findUserByIdRepository,
} from "../repositories/incident.repository";

import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { BadRequestError } from "../errors/BadRequestError";

type CreateIOCServiceInput = {
  type: IOCType;
  value: string;
  description?: string;
  severity: IOCSeverity;
  confidence: number;
  source: IOCSource;
  createdById: string;
};

const normalizeIOCValue = (
  type: IOCType,
  value: string,
): string => {
  const normalized = value.trim();

  switch (type) {
    case IOCType.DOMAIN:
    case IOCType.EMAIL:
    case IOCType.URL:
      return normalized.toLowerCase();

    default:
      return normalized;
  }
};

/**
 * Create IOC
 */
export const createIOCService = async (
  data: CreateIOCServiceInput,
) => {
  return withTransaction(async (tx) => {
    const user = await findUserByIdRepository(
      data.createdById,
      tx,
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const normalizedValue = normalizeIOCValue(
      data.type,
      data.value,
    );

    const duplicate =
      await findDuplicateIOCRepository(
        data.type,
        normalizedValue,
        data.source,
        tx,
      );

    if (duplicate) {
      throw new ConflictError(
        "IOC already exists",
      );
    }

    if (
      data.confidence < 0 ||
      data.confidence > 100
    ) {
      throw new BadRequestError(
        "Confidence must be between 0 and 100",
      );
    }

    return createIOCRepository(
      {
        ...data,
        value: normalizedValue,
      },
      tx,
    );
  });
};

/**
 * Get All IOCs
 */
export const getIOCsService = async (
  skip: number,
  limit: number,
) => {
  return getIOCsRepository(skip, limit);
};

/**
 * Get IOC By ID
 */
export const getIOCByIdService = async (
  id: string,
) => {
  const ioc = await getIOCByIdRepository(id);

  if (!ioc) {
    throw new NotFoundError("IOC not found");
  }

  return ioc;
};

/**
 * Soft Delete IOC
 */
export const softDeleteIOCService = async (
  id: string,
) => {
  return withTransaction(async (tx) => {
    const ioc = await getIOCByIdRepository(
      id,
      tx,
    );

    if (!ioc) {
      throw new NotFoundError("IOC not found");
    }

    return softDeleteIOCRepository(
      id,
      tx,
    );
  });
};