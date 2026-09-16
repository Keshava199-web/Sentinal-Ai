import {
  AlertSeverity,
  IncidentStatus as PrismaIncidentStatus,
} from "@prisma/client";

export const INCIDENT_SEVERITIES = [
  AlertSeverity.LOW,
  AlertSeverity.MEDIUM,
  AlertSeverity.HIGH,
  AlertSeverity.CRITICAL,
] as const;

export const INCIDENT_STATUSES = [
  PrismaIncidentStatus.OPEN,
  PrismaIncidentStatus.TRIAGED,
  PrismaIncidentStatus.INVESTIGATING,
  PrismaIncidentStatus.CONTAINED,
  PrismaIncidentStatus.ERADICATED,
  PrismaIncidentStatus.RECOVERED,
  PrismaIncidentStatus.CLOSED,
] as const;

export type IncidentSeverity = AlertSeverity;
export type IncidentStatus = PrismaIncidentStatus;