import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/types/shared/api";

/**
 * =========================================================
 * INCIDENT TYPES
 * =========================================================
 * Shared types used across:
 * - Services
 * - React Query Hooks
 * - Components
 * - Forms
 * =========================================================
 */

export const INCIDENT_SEVERITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export type IncidentSeverity =
  (typeof INCIDENT_SEVERITIES)[number];

export const INCIDENT_STATUSES = [
  "OPEN",
  "INVESTIGATING",
  "RESOLVED",
  "CLOSED",
] as const;

export type IncidentStatus =
  (typeof INCIDENT_STATUSES)[number];

export interface Incident {
  id: string;

  title: string;

  description: string;

  severity: IncidentSeverity;

  status: IncidentStatus;

  sourceIp?: string | null;

  assignedToId?: string | null;

  createdById: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateIncidentRequest {
  title: string;

  description: string;

  severity: IncidentSeverity;

  sourceIp?: string;
}

export interface UpdateIncidentRequest {
  status: IncidentStatus;
}

export interface IncidentQueryParams {
  page?: number;

  limit?: number;

  severity?: IncidentSeverity;

  status?: IncidentStatus;

  search?: string;
}

/**
 * =========================================================
 * API RESPONSE TYPES
 * =========================================================
 */

export type IncidentResponse =
  ApiResponse<Incident>;

export type IncidentListResponse =
  PaginatedApiResponse<Incident>;