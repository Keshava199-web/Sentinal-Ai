import { Role } from "@prisma/client";

export interface UserPayload {
  userId: string;
  email: string;
  role: Role;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export {};
