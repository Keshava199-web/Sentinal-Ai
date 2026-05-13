import { Router } from "express";

import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  deleteIncident,
} from "../controllers/incident.controller";

import {
  protect,
} from "../middleware/auth.middleware";

import {
  authorizeRoles,
} from "../middleware/role.middleware";

const router = Router();

/**
 * Incident Routes
 */

router.get(
  "/",
  protect,
  getIncidents
);

/**
 * Get Single Incident
 */
router.get(
  "/:id",
  protect,
  getIncidentById
);

/**
 * Update Incident Status
 */
router.patch(
  "/:id",
  protect,
  authorizeRoles(
    "ADMIN",
    "ANALYST"
  ),
  updateIncidentStatus
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteIncident
);

router.post(
  "/",
  protect,
  authorizeRoles(
    "ADMIN",
    "ANALYST"
  ),
  createIncident
);

export default router;