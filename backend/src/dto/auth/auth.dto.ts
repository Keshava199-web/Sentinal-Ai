import { User } from "@prisma/client";

import {
  UserResponseDto,
  toUserResponseDto,
} from "../user/user.dto";

export const toLoginResponse = (
  token: string,
  user: User,
) => ({
  token,
  user: toUserResponseDto(user),
});

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
}

export const toAuthResponseDto = (
  token: string,
  user: User,
): AuthResponseDto => ({
  token,
  user: toUserResponseDto(user),
});