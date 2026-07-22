import { AuditAction } from "@prisma/client";
import prisma from "../config/prisma";

export const createAuditLog = async (
  action: AuditAction,
  userId: string,
  incidentId?: string,
): Promise<void> => {
  const normalizedUserId = userId.trim();

  if (!normalizedUserId) {
    throw new Error("Invalid userId for audit log.");
  }

  await prisma.auditLog.create({
    data: {
      action,
      userId: normalizedUserId,
      incidentId: incidentId?.trim() || null,
    },
  });
};
