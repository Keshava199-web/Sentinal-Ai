import {
  db,
  PrismaExecutor,
} from "../database/prisma";

/**
 * Shared Evidence Relations
 */
const evidenceRelations = {
  uploadedBy: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

type CreateEvidenceRepositoryInput = {
  incidentId: string;
  uploadedById: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  storagePath: string;
  sha256: string;
};

/**
 * Create Evidence
 */
export const createEvidenceRepository = async (
  data: CreateEvidenceRepositoryInput,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentEvidence.create({
    data,
    include: evidenceRelations,
  });
};

/**
 * Get Evidence By Incident
 */
export const getIncidentEvidenceRepository = async (
  incidentId: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentEvidence.findMany({
    where: {
      incidentId,
    },
    include: evidenceRelations,
    orderBy: {
      uploadedAt: "desc",
    },
  });
};

/**
 * Get Evidence By ID
 */
export const getEvidenceByIdRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentEvidence.findUnique({
    where: {
      id,
    },
    include: evidenceRelations,
  });
};

/**
 * Delete Evidence
 */
export const deleteEvidenceRepository = async (
  id: string,
  tx: PrismaExecutor = db,
) => {
  return tx.incidentEvidence.delete({
    where: {
      id,
    },
  });
};