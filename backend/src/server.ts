import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/**
 * Environment validation
 */
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * Secure CORS configuration
 * Restrict origins in production
 */
app.use(
  cors({
    origin:
      NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]
        : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/**
 * Security headers
 */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/**
 * Request logging
 */
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

/**
 * Body parsing with limits
 * Prevent large payload abuse
 */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/**
 * Health check route
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SentinelAI Backend Running",
    environment: NODE_ENV,
  });
});

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global error handler
 */
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);

    res.status(500).json({
      success: false,
      message:
        NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
  }
);

/**
 * Disable X-Powered-By header
 * Prevent Express fingerprinting
 */
app.disable("x-powered-by");

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});