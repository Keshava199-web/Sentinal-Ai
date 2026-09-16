import { Router, Request, Response } from "express";

import { protect } from "../middleware/auth.middleware";

const router = Router();

/**
 * Protected Profile Route
 */
router.get("/profile", protect, (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: {
      userId: req.user?.userId,
      role: req.user?.role,
    },
  });
});

export default router;