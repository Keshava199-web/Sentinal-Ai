import rateLimit from "express-rate-limit";

const isProduction = process.env.NODE_ENV === "production";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: isProduction ? 5 : 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },

  skipSuccessfulRequests: true,
});