import prisma from "../config/prisma";

/**
 * Maximum action length
 */
const MAX_ACTION_LENGTH = 100;

/**
 * Audit Logger
 */
export const createAuditLog = async (
  action: string,
  userId: string,
  incidentId?: string
): Promise<boolean> => {
  try {
    /**
     * Validate required fields
     */
    if (
      typeof action !== "string" ||
      typeof userId !== "string"
    ) {
      console.error(
        "[AUDIT_LOG_ERROR] Invalid input types"
      );

      return false;
    }

    /**
     * Normalize inputs
     */
    const normalizedAction =
      action.trim().toUpperCase();

    const normalizedUserId =
      userId.trim();

    const normalizedIncidentId =
      typeof incidentId === "string"
        ? incidentId.trim()
        : undefined;

    /**
     * Empty validation
     */
    if (
      !normalizedAction ||
      !normalizedUserId
    ) {
      console.error(
        "[AUDIT_LOG_ERROR] Missing required values"
      );

      return false;
    }

    /**
     * Prevent oversized actions
     */
    if (
      normalizedAction.length >
      MAX_ACTION_LENGTH
    ) {
      console.error(
        "[AUDIT_LOG_ERROR] Action too long"
      );

      return false;
    }

    /**
     * Create audit log
     */
    await prisma.auditLog.create({
      data: {
        action: normalizedAction,
        userId: normalizedUserId,
        incidentId:
          normalizedIncidentId ?? null,
      },
    });

    return true;
  } catch (error) {
    console.error(
      "[AUDIT_LOG_ERROR]",
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
        action,
        userId,
        incidentId: incidentId ?? null,
      }
    );

    return false;
  }
};