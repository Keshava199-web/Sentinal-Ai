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

import validate from "../middleware/validate.middleware";

import {
  createIncidentSchema,
  updateIncidentSchema,
  incidentQuerySchema,
  incidentIdParamSchema,
} from "../validators/incident.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Incidents
 *   description: Incident management APIs
 */

/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Get all incidents
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *         example: HIGH
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: OPEN
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: brute force
 *     responses:
 *       200:
 *         description: Incidents fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  protect,
  validate(
    incidentQuerySchema,
    "query"
  ),
  getIncidents
);

/**
 * @swagger
 * /incidents/{id}:
 *   get:
 *     summary: Get single incident
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Incident fetched successfully
 *       404:
 *         description: Incident not found
 */
router.get(
  "/:id",
  protect,
   validate(
    incidentIdParamSchema,
    "params"
  ),
  getIncidentById
);

/**
 * @swagger
 * /incidents:
 *   post:
 *     summary: Create incident
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - severity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Brute Force Login Attempt
 *               description:
 *                 type: string
 *                 example: Multiple failed SSH login attempts detected
 *               severity:
 *                 type: string
 *                 example: HIGH
 *               sourceIp:
 *                 type: string
 *                 example: 192.168.1.10
 *     responses:
 *       201:
 *         description: Incident created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  protect,
  authorizeRoles(
    "ADMIN",
    "ANALYST"
  ),
  validate(
    createIncidentSchema
  ),
  createIncident
);

/**
 * @swagger
 * /incidents/{id}:
 *   patch:
 *     summary: Update incident status
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: INVESTIGATING
 *     responses:
 *       200:
 *         description: Incident updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id",
  protect,
  authorizeRoles(
    "ADMIN",
    "ANALYST"
  ),
  validate(
    incidentIdParamSchema,
    "params"
  ),
  validate(
    updateIncidentSchema
  ),
  updateIncidentStatus
);

/**
 * @swagger
 * /incidents/{id}:
 *   delete:
 *     summary: Delete incident
 *     tags:
 *       - Incidents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Incident deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Incident not found
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
   validate(
    incidentIdParamSchema,
    "params"
  ),
  deleteIncident
);

export default router;