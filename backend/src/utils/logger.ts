/**
 * ============================================================
 * Sentinel-AI Logger
 * ============================================================
 * Centralized application logger.
 *
 * Current:
 *  - Console-based logging
 *
 * Future:
 *  - Replace with Pino/Winston
 *  - File logging
 *  - JSON logs
 *  - Log rotation
 *  - Correlation IDs
 * ============================================================
 */

const formatMessage = (
  level: string,
  message: string,
) => {
  return `[${new Date().toISOString()}] [${level}] ${message}`;
};

export const logger = {
  info(message: string, ...meta: unknown[]) {
    console.log(
      formatMessage("INFO", message),
      ...meta,
    );
  },

  warn(message: string, ...meta: unknown[]) {
    console.warn(
      formatMessage("WARN", message),
      ...meta,
    );
  },

  error(message: string, ...meta: unknown[]) {
    console.error(
      formatMessage("ERROR", message),
      ...meta,
    );
  },

  debug(message: string, ...meta: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        formatMessage("DEBUG", message),
        ...meta,
      );
    }
  },
};