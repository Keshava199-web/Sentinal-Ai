import prisma from "../config/prisma";

/**
 * Audit Logger
 */
export const createAuditLog = async (
  action: string,
  userId: string,
  incidentId?: string
) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        userId,
        incidentId,
      },
    });
  } catch (error) {
    console.error(
      "[AUDIT_LOG_ERROR]",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );
  }
};