import path from "path";

import { TimelineAction } from "@prisma/client";

import { generateFileHash } from "../utils/fileHash";

import { withTransaction } from "../database/transaction";

import {
  createTimelineEntryRepository,
} from "../repositories/incidentTimeline.repository";

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

export const createEvidenceService = async (
  data: CreateEvidenceServiceInput,
) => {
  /**
   * Generate SHA-256 before transaction
   */
  const sha256 = await generateFileHash(
    data.file.path,
  );

  return withTransaction(async (tx) => {
    /**
     * Verify incident
     */
    const incident = await getIncidentByIdRepository(
      data.incidentId,
      tx,
    );

    if (!incident) {
      throw new NotFoundError("Incident not found");
    }

    /**
     * Verify uploader
     */
    const user = await findUserByIdRepository(
      data.uploadedById,
      tx,
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    /**
     * Save evidence
     */
    const evidence = await createEvidenceRepository(
      {
        incidentId: data.incidentId,
        uploadedById: data.uploadedById,
        fileName: path.basename(data.file.filename),
        originalName: data.file.originalname,
        mimeType: data.file.mimetype,
        fileSize: data.file.size,
        storagePath: data.file.path,
        sha256,
      },
      tx,
    );

    /**
     * Timeline
     */
    await createTimelineEntryRepository(
      {
        incidentId: data.incidentId,
        userId: data.uploadedById,
        action: TimelineAction.EVIDENCE_UPLOADED,
        description: `Evidence uploaded: ${data.file.originalname}`,
        metadata: {
          evidenceId: evidence.id,
          sha256,
        },
      },
      tx,
    );

    return evidence;
  });
};

/**
 * Upload Evidence
 */
// export const createEvidenceService = async (
//   data: CreateEvidenceServiceInput,
// ) => {
//   /**
//    * Generate SHA-256 before opening transaction.
//    * Hashing is a filesystem operation, not a database operation.
//    */
//   const sha256 = await generateFileHash(
//     data.file.path,
//   );

//   return withTransaction(async (tx) => {
//     /**
//      * Verify incident
//      */
//     const incident =
//       await getIncidentByIdRepository(
//         data.incidentId,
//         tx,
//       );

//     if (!incident) {
//       throw new NotFoundError(
//         "Incident not found",
//       );
//     }

//     /**
//      * Verify uploader
//      */
//     const user =
//       await findUserByIdRepository(
//         data.uploadedById,
//         tx,
//       );

//     if (!user) {
//       throw new NotFoundError(
//         "User not found",
//       );
//     }

//     /**
//      * Save evidence
//      */
//     const evidence =
//       await createEvidenceRepository(
//         {
//           incidentId: data.incidentId,
//           uploadedById: data.uploadedById,
//           fileName: path.basename(
//             data.file.filename,
//           ),
//           originalName: data.file.originalname,
//           mimeType: data.file.mimetype,
//           fileSize: data.file.size,
//           storagePath: data.file.path,
//           sha256,
//         },
//         tx,
//       );

//     /**
//      * Timeline
//      */
//     await createTimelineEntryRepository(
//       {
//         incidentId: data.incidentId,
//         userId: data.uploadedById,
//         action: TimelineAction.EVIDENCE_UPLOADED,
//         description: `Evidence uploaded: ${data.file.originalname}`,
//         metadata: {
//           evidenceId: evidence.id,
//           sha256,
//         },
//       },
//       tx,
//     );

//     return evidence;
//   });
// };

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