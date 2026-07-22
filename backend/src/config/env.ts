import dotenv from "dotenv";

dotenv.config();

/**
 * Required environment variables
 */
const requiredEnvVars = ["JWT_SECRET", "JWT_REFRESH_SECRET"] as const;

/**
 * Validate required env vars
 */
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

/**
 * Export validated env vars
 */
export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: process.env.PORT || "5000",
};
