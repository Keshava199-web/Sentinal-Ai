import { Request, Response, NextFunction } from "express";

import {
  createEvidenceService,
  getIncidentEvidenceService,
  deleteEvidenceService,
} from "../services/incidentEvidence.service";

/**
 * Upload Evidence
 */
export const uploadEvidence = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Evidence file is required",
      });
    }

    const evidence = await createEvidenceService({
      incidentId: req.params.id as string,
      uploadedById: req.user.userId,
      file: req.file,
    });

    return res.status(201).json({
      success: true,
      evidence,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Evidence
 */
export const getIncidentEvidence = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const evidence =
      await getIncidentEvidenceService(
        req.params.id as string,
      );

    return res.status(200).json({
      success: true,
      evidence,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Evidence
 */
export const deleteEvidence = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteEvidenceService(
      req.params.id as string,
    );

    return res.status(200).json({
      success: true,
      message: "Evidence deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};