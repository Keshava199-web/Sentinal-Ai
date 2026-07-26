import { Router } from "express";

import {
  createIOC,
  getIOCs,
  getIOCById,
  deleteIOC,
} from "../controllers/ioc.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import {
  createIOCSchema,
  getIOCsSchema,
  getIOCByIdSchema,
  deleteIOCSchema,
} from "../validators/ioc.validator";

const router = Router();

/**
 * Create IOC
 */
router.post(
  "/",
  protect,
  authorize("ADMIN", "ANALYST", "SOC_MANAGER"),
  validate(createIOCSchema),
  createIOC,
);

/**
 * List IOCs
 */
router.get(
  "/",
  protect,
  authorize("ADMIN", "ANALYST", "SOC_MANAGER", "VIEWER"),
  validate(getIOCsSchema, "query"),
  getIOCs,
);

/**
 * Get IOC
 */
router.get(
  "/:id",
  protect,
  authorize("ADMIN", "ANALYST", "SOC_MANAGER", "VIEWER"),
  validate(getIOCByIdSchema, "params"),
  getIOCById,
);

/**
 * Soft Delete
 */
router.delete(
  "/:id",
  protect,
  authorize("ADMIN", "SOC_MANAGER"),
  validate(deleteIOCSchema, "params"),
  deleteIOC,
);

export default router;