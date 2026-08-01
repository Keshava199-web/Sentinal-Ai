import { Response } from "express";

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Standard Success Response
 */
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard Error Response
 */
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown,
) => {
    const response: {
    success: boolean;
    message: string;
    errors?: unknown;
  } = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Standard Paginated Response
 */
export const paginatedResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  pagination: PaginationMeta,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};