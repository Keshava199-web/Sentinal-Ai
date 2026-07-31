import { Request, Response } from "express";

import {
  linkIOCToIncidentService,
  getIncidentIOCsService,
  getIOCIncidentsService,
  unlinkIOCFromIncidentService,
} from "../services/incidentIOC.service";

import { HTTP_STATUS } from "../constants/httpStatus";
import { successResponse } from "../utils/apiResponse";

export const linkIOCToIncident = async (
  req: Request,
  res: Response,
) => {
  const link = await linkIOCToIncidentService({
    incidentId: req.body.incidentId,
    iocId: req.body.iocId,
    linkedById: req.user!.userId,
    notes: req.body.notes,
  });

  return successResponse(
    res,
    HTTP_STATUS.CREATED,
    "IOC linked to incident successfully",
    link,
  );
};

export const getIncidentIOCs = async (
  req: Request,
  res: Response,
) => {
  const { incidentId } = req.params;

  const result = await getIncidentIOCsService(
    incidentId as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Incident IOCs fetched successfully",
    result,
  );
};

export const getIOCIncidents = async (
  req: Request,
  res: Response,
) => {
  const { iocId } = req.params;

  const result = await getIOCIncidentsService(
    iocId as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "IOC incidents fetched successfully",
    result,
  );
};

export const unlinkIOCFromIncident = async (
  req: Request,
  res: Response,
) => {
  const {
    incidentId,
    iocId,
  } = req.params;

  await unlinkIOCFromIncidentService(
    incidentId as string,
    iocId as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "IOC unlinked successfully",
    null,
  );
};