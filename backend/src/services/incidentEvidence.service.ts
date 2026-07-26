import path from "path";

import { TimelineAction } from "@prisma/client";

import { generateFileHash } from "../utils/fileHash";

import { createTimelineEntryService } from "./incidentTimeline.service";

import {
  createEvidenceRepository,
  getIncidentEvidenceRepository,
  getEvidenceByIdRepository,
  deleteEvidenceRepository,
} from "../repositories/incidentEvidence.repository";

import {
  getIncidentByIdRepository,
  findUserByIdRepository,
} from "../repositories/incident.repository";

import { NotFoundError } from "../errors/NotFoundError";

type CreateEvidenceServiceInput = {
  incidentId: string;
  uploadedById: string;
  file: Express.Multer.File;
};

/**
 * Upload Evidence
 */
export const createEvidenceService = async (
  data: CreateEvidenceServiceInput,
) => {
  /**
   * Verify incident
   */
  const incident = await getIncidentByIdRepository(
    data.incidentId,
  );

  if (!incident) {
    throw new NotFoundError("Incident not found");
  }

  /**
   * Verify uploader
   */
  const user = await findUserByIdRepository(
    data.uploadedById,
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  /**
   * Generate SHA-256
   */
  const sha256 = await generateFileHash(
    data.file.path,
  );

  /**
   * Save evidence
   */
  const evidence =
    await createEvidenceRepository({
      incidentId: data.incidentId,
      uploadedById: data.uploadedById,
      fileName: path.basename(data.file.filename),
      originalName: data.file.originalname,
      mimeType: data.file.mimetype,
      fileSize: data.file.size,
      storagePath: data.file.path,
      sha256,
    });

  /**
   * Timeline
   */
  await createTimelineEntryService({
    incidentId: data.incidentId,
    userId: data.uploadedById,
    action: TimelineAction.EVIDENCE_UPLOADED,
    description: `Evidence uploaded: ${data.file.originalname}`,
    metadata: {
      evidenceId: evidence.id,
      sha256,
    },
  });

  return evidence;
};

/**
 * Get Evidence
 */
export const getIncidentEvidenceService =
  async (
    incidentId: string,
  ) => {
    const incident =
      await getIncidentByIdRepository(
        incidentId,
      );

    if (!incident) {
      throw new NotFoundError(
        "Incident not found",
      );
    }

    return getIncidentEvidenceRepository(
      incidentId,
    );
  };

/**
 * Delete Evidence
 */
export const deleteEvidenceService =
  async (
    evidenceId: string,
  ) => {
    const evidence =
      await getEvidenceByIdRepository(
        evidenceId,
      );

    if (!evidence) {
      throw new NotFoundError(
        "Evidence not found",
      );
    }

    return deleteEvidenceRepository(
      evidenceId,
    );
  };