import { Request, Response, NextFunction } from "express";

import { TimelineAction } from "@prisma/client";

import {
  createTimelineEntryService,
  getIncidentTimelineService,
} from "../services/incidentTimeline.service";

interface IncidentParams {
  id: string;
}

/**
 * Create Timeline Entry
 */
export const createTimelineEntry = async (
  req: Request<IncidentParams>,
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

    const { action, description, metadata } = req.body;

    const timeline = await createTimelineEntryService({
      incidentId: req.params.id as string,
      userId: req.user.userId,
      action: action as TimelineAction,
      description,
      metadata,
    });

    return res.status(201).json({
      success: true,
      timeline,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Timeline
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