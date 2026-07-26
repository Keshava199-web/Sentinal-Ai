import {
  Request,
  Response,
} from "express";

import {
  createIOCService,
  getIOCsService,
  getIOCByIdService,
  softDeleteIOCService,
} from "../services/ioc.service";

// import { AuthenticatedRequest } from "../types/express";

import { HTTP_STATUS } from "../constants/httpStatus";
import { successResponse } from "../utils/apiResponse";

export const createIOC = async (
  req: Request,
  res: Response,
) => {
  const ioc = await createIOCService({
    ...req.body,
    createdById: req.user!.userId,
  });

  return successResponse(
    res,
    HTTP_STATUS.CREATED,
    "IOC created successfully",
    ioc,
  );
};

export const getIOCs = async (
  req: Request,
  res: Response,
) => {
  const page = Number(req.query.page ?? 1);

  const limit = Number(req.query.limit ?? 10);

  const skip = (page - 1) * limit;

  const iocs = await getIOCsService(
    skip,
    limit,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "IOCs fetched successfully",
    iocs,
  );
};

export const getIOCById = async (
  req: Request,
  res: Response,
) => {
  const ioc = await getIOCByIdService(
    req.params.id as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "IOC fetched successfully",
    ioc,
  );
};

export const deleteIOC = async (
  req: Request,
  res: Response,
) => {
  await softDeleteIOCService(
    req.params.id as string,
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "IOC deleted successfully",
    null,
  );
};