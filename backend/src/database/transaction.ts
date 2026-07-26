import { db, PrismaTransaction } from "./prisma";

/**
 * Executes an atomic database transaction.
 */
export const withTransaction = async <T>(
  callback: (tx: PrismaTransaction) => Promise<T>,
): Promise<T> => {
    return db.$transaction(async (tx) => {
        return callback(tx);
    });
};