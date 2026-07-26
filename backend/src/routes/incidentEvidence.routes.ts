import { Router } from "express";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

import { uploadEvidence } from "../middleware/upload.middleware";

import {
  uploadEvidence as uploadEvidenceController,
  getIncidentEvidence,
  deleteEvidence,
} from "../controllers/incidentEvidence.controller";

const router = Router();

/**
 * Upload Evidence
 */
router.post(
  "/:id/evidence",
  protect,
  authorize("ADMIN", "ANALYST"),
  uploadEvidence.single("file"),
  uploadEvidenceController,
);

/**
 * Get Evidence
 */
router.get(
  "/:id/evidence",
  protect,
  getIncidentEvidence,
);

/**
 * Delete Evidence
 */
router.delete(
  "/evidence/:id",
  protect,
  authorize("ADMIN"),
  deleteEvidence,
);

export default router;