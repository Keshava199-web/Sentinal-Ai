import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    status: "OK",
    service: "Sentinel-AI Backend",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;