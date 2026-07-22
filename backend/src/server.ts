import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import dbRoutes from "./routes/db.routes";
import incidentRoutes from "./routes/incident.routes";
import userRoutes from "./routes/user.routes";
import auditRoutes from "./routes/audit.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

/**
 * Environment validation
 */
const PORT = Number(process.env.PORT) || 5000;
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
        : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  }),
);

/**
 * Security headers
 */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
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

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/incidents", incidentRoutes);
app.use("/db-test", dbRoutes);
app.use("/user", userRoutes);
app.use("/audit", auditRoutes);

/**
 * Swagger Doc
 */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Sentinel-AI Docs",
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  }),
);
/**
 * Health check route
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Sentinel-AI Backend Running",
    //environment: NODE_ENV,
  });
});

app.get("/api-docs.json", (_, res) => {
  res.json(swaggerSpec);
});

/**
 * 404 handler
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global error handler
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err.message);

  res.status(500).json({
    success: false,
    message: NODE_ENV === "production" ? "Internal Server Error" : err.message,
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorMiddleware);
