import { User } from "@prisma/client";

export interface UserResponseDto {
  id: string;
  email: string;
  role: User["role"];
  createdAt: Date;
}

export const toUserResponseDto = (
  user: User,
): UserResponseDto => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});