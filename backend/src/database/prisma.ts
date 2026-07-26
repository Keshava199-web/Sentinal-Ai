import { Prisma, PrismaClient } from "@prisma/client";

import prisma from "../config/prisma";

/**
 * Default Prisma Client
 */
export const db = prisma;

/**
 * Transaction Client
 */
export type PrismaTransaction = Prisma.TransactionClient;

/**
 * Database Executor
 *
 * Can be either:
 * - Default Prisma Client
 * - Transaction Client
 */
export type PrismaExecutor =
  PrismaClient | PrismaTransaction;