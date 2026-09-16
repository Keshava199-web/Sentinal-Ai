import {
  Request,
  Response,
} from "express";

import {
  createAlertService,
  getAlertsService,
  getAlertByIdService,
  updateAlertService,
  deleteAlertService,
  getAlertsByIncidentService,
  getAlertsByAssigneeService,
} from "../services/alert.service";

import { HTTP_STATUS } from "../constants/httpStatus";
import { successResponse } from "../utils/apiResponse";

/**
 * Create Alert
 */
export const createAlert = async (
  req: Request,
  res: Response,
) => {
  const alert = await createAlertService(req.body);

  return successResponse(
    res,
    HTTP_STATUS.CREATED,
    "Alert created successfully",
    alert,
  );
};

/**
 * Get Alerts
 */
export const getAlerts = async (
  req: Request,
  res: Response,
) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const skip = (page - 1) * limit;

  const alerts = await getAlertsService(
    skip,
    limit,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Alerts fetched successfully",
    alerts,
  );
};

/**
 * Get Alert By ID
 */
export const getAlertById = async (
  req: Request,
  res: Response,
) => {
  const alert = await getAlertByIdService(
    req.params.id as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Alert fetched successfully",
    alert,
  );
};

/**
 * Update Alert
 */
export const updateAlert = async (
  req: Request,
  res: Response,
) => {
  const alert = await updateAlertService(
    req.params.id as string,
    req.body,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Alert updated successfully",
    alert,
  );
};

/**
 * Delete Alert
 */
export const deleteAlert = async (
  req: Request,
  res: Response,
) => {
  await deleteAlertService(
    req.params.id as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Alert deleted successfully",
    null,
  );
};

/**
 * Get Alerts By Incident
 */
export const getAlertsByIncident = async (
  req: Request,
  res: Response,
) => {
  const alerts =
    await getAlertsByIncidentService(
      req.params.incidentId as string,
    );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Incident alerts fetched successfully",
    alerts,
  );
};

/**
 * Get Alerts By Assignee
 */
export const getAlertsByAssignee = async (
  req: Request,
  res: Response,
) => {
  const alerts =
    await getAlertsByAssigneeService(
      req.params.userId as string,
    );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "Assigned alerts fetched successfully",
    alerts,
  );
};