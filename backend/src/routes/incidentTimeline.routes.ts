import { Request, Response, NextFunction } from "express";

import { getIncidentTimelineService } from "../services/incidentTimeline.service";

/**
 * Get Incident Timeline
 */
export const getIncidentTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const incidentId = req.params.id as string;

    const timeline = await getIncidentTimelineService(
      incidentId,
    );

    return res.status(200).json({
      success: true,
      timeline,
    });
  } catch (error) {
    next(error);
  }
};