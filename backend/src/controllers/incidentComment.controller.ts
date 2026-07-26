import { Request, Response, NextFunction } from "express";

import {
  createIncidentCommentService,
  getIncidentCommentsService,
} from "../services/incidentComment.service";

/**
 * Create Comment
 */
export const createIncidentComment = async (
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

    const incidentId = req.params.id as string;

    const comment = await createIncidentCommentService({
      incidentId,
      userId: req.user.userId,
      comment: req.body.comment,
    });

    return res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Incident Comments
 */
export const getIncidentComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const incidentId = req.params.id as string;

    const comments =
      await getIncidentCommentsService(incidentId);

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};