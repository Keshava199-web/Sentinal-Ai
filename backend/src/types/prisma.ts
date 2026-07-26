import prisma from "../config/prisma";
import { PrismaClient } from "@prisma/client";

/**
 * Default Prisma Client
 */
export const db = prisma;

/**
 * Prisma Transaction Client
 */
export type PrismaTransaction =
  Parameters<
    Parameters<PrismaClient["$transaction"]>[0]
  >[0];