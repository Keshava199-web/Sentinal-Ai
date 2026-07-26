import prisma from "../config/prisma";

const commentRelations = {
  user: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} as const;

type CreateIncidentCommentRepositoryInput = {
  incidentId: string;
  userId: string;
  comment: string;
};

/**
 * Create Comment
 */
export const createIncidentCommentRepository = async (
  data: CreateIncidentCommentRepositoryInput,
) => {
  return prisma.incidentComment.create({
    data,
    include: commentRelations,
  });
};

/**
 * Get Comments
 */
export const getIncidentCommentsRepository = async (
  incidentId: string,
) => {
  return prisma.incidentComment.findMany({
    where: {
      incidentId,
    },
    include: commentRelations,
    orderBy: {
      createdAt: "asc",
    },
  });
};