export const PASSWORD_CONFIG = {
  SALT_ROUNDS: 12,
  MIN_LENGTH: 12,
  MAX_LENGTH: 128,
} as const;

export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRES_IN: "15m",
  ISSUER: "sentinel-ai",
  AUDIENCE: "sentinel-ai-users",
} as const;