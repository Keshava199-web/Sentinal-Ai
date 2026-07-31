import { User } from "@prisma/client";

export const buildUserResponse = (user: User) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});