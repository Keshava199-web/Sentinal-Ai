import { Router } from "express";

import {
  createAlert,
  getAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
  getAlertsByIncident,
  getAlertsByAssignee,
} from "../controllers/alert.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import {
  createAlertSchema,
  getAlertsSchema,
  getAlertByIdSchema,
  updateAlertSchema,
  deleteAlertSchema,
  getAlertsByIncidentSchema,
  getAlertsByAssigneeSchema,
} from "../validators/alert.validator";

const router = Router();

/**
 * Create Alert
 */
router.post(
  "/",
  protect,
  authorize("ADMIN", "ANALYST", "SOC_MANAGER"),
  validate(createAlertSchema),
  createAlert,
);

/**
 * List Alerts
 */
router.get(
  "/",
  protect,
  authorize(
    "ADMIN",
    "ANALYST",
    "SOC_MANAGER",
    "VIEWER",
  ),
  validate(getAlertsSchema, "query"),
  getAlerts,
);

/**
 * Get Alert
 */
router.get(
  "/:id",
  protect,
  authorize(
    "ADMIN",
    "ANALYST",
    "SOC_MANAGER",
    "VIEWER",
  ),
  validate(getAlertByIdSchema, "params"),
  getAlertById,
);

/**
 * Update Alert
 */
router.patch(
  "/:id",
  protect,
  authorize("ADMIN", "ANALYST", "SOC_MANAGER"),
  validate(updateAlertSchema),
  updateAlert,
);

/**
 * Delete Alert
 */
router.delete(
  "/:id",
  protect,
  authorize("ADMIN", "SOC_MANAGER"),
  validate(deleteAlertSchema, "params"),
  deleteAlert,
);

/**
 * Alerts belonging to an incident
 */
router.get(
  "/incident/:incidentId",
  protect,
  authorize(
    "ADMIN",
    "ANALYST",
    "SOC_MANAGER",
    "VIEWER",
  ),
  validate(
    getAlertsByIncidentSchema,
    "params",
  ),
  getAlertsByIncident,
);

/**
 * Alerts assigned to a user
 */
router.get(
  "/assignee/:userId",
  protect,
  authorize(
    "ADMIN",
    "ANALYST",
    "SOC_MANAGER",
    "VIEWER",
  ),
  validate(
    getAlertsByAssigneeSchema,
    "params",
  ),
  getAlertsByAssignee,
);

export default router;