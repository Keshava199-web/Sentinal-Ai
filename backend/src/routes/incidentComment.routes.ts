import { Router } from "express";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import {
  createIncidentComment,
  getIncidentComments,
} from "../controllers/incidentComment.controller";

import { createIncidentCommentSchema } from "../validators/incidentComment.validator";

const router = Router();

/**
 * Get Comments
 */
router.get(
  "/:id/comments",
  protect,
  getIncidentComments,
);

/**
 * Add Comment
 */
router.post(
  "/:id/comments",
  protect,
  authorize("ADMIN", "ANALYST"),
  validate(createIncidentCommentSchema),
  createIncidentComment,
);

export default router;