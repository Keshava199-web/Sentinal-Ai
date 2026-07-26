import { HTTP_STATUS } from "../constants/httpStatus";
import { AppError } from "./AppError";

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}