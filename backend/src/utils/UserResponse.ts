import { User } from "@prisma/client";

export const buildUserResponse = (user: User) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

import { Response } from "express";

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

export const paginatedResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};