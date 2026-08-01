export const INCIDENT_SEVERITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export const INCIDENT_STATUSES = [
  "OPEN",
  "TRIAGED",
  "INVESTIGATING",
  "CONTAINED",
  "ERADICATED",
  "RECOVERED",
  "CLOSED",
] as const;

export type IncidentSeverity =
  typeof INCIDENT_SEVERITIES[number];

export type IncidentStatus =
  typeof INCIDENT_STATUSES[number];