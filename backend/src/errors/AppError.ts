/**
 * =========================================================
 * Base Application Error
 * =========================================================
 * Parent class for all custom application errors.
 * Enables centralized error handling with HTTP status codes.
 * =========================================================
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}