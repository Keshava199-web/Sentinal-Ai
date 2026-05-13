import {
  Router,
  Response,
} from "express";

import {
  protect,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

/**
 * Protected Profile Route
 */
router.get(
  "/profile",
  protect,
  (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  }
);

export default router;