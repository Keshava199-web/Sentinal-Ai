import { Router } from "express";

import { Role } from "@prisma/client";

import {
  linkIOCToIncident,
  getIncidentIOCs,
  getIOCIncidents,
  unlinkIOCFromIncident,
} from "../controllers/incidentIOC.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import validate from "../middleware/validate.middleware";

import {
  linkIncidentIOCSchema,
  getIncidentIOCsSchema,
  getIOCIncidentsSchema,
  unlinkIncidentIOCSchema,
} from "../validators/incidentIOC.validator";

const router = Router();

router.post(
  "/",
  protect,
  authorize(
    Role.ANALYST,
    Role.ADMIN,
    Role.SOC_MANAGER,
  ),
  validate(linkIncidentIOCSchema),
  linkIOCToIncident,
);

router.get(
  "/incident/:incidentId",
  protect,
  validate(getIncidentIOCsSchema),
  getIncidentIOCs,
);

router.get(
  "/ioc/:iocId",
  protect,
  validate(getIOCIncidentsSchema),
  getIOCIncidents,
);

router.delete(
  "/incident/:incidentId/ioc/:iocId",
  protect,
  authorize(
    Role.ANALYST,
    Role.ADMIN,
    Role.SOC_MANAGER,
  ),
  validate(unlinkIncidentIOCSchema),
  unlinkIOCFromIncident,
);

export default router;