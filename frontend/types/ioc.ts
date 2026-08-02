import type {
  ApiResponse,
  PaginatedApiResponse,
} from "@/types/shared/api";

/**
 * =========================================================
 * IOC TYPES
 * =========================================================
 */

export const IOC_TYPES = [
  "IP",
  "DOMAIN",
  "URL",
  "EMAIL",
  "SHA256",
  "SHA1",
  "MD5",
  "FILE_NAME",
  "CVE",
  "MITRE_TECHNIQUE",
] as const;

export type IOCType =
  (typeof IOC_TYPES)[number];

export const IOC_SEVERITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export type IOCSeverity =
  (typeof IOC_SEVERITIES)[number];

export const IOC_STATUSES = [
  "ACTIVE",
  "WHITELISTED",
  "FALSE_POSITIVE",
  "EXPIRED",
] as const;

export type IOCStatus =
  (typeof IOC_STATUSES)[number];

export const IOC_SOURCES = [
  "MANUAL",
  "VIRUSTOTAL",
  "ABUSEIPDB",
  "OTX",
  "MISP",
  "WAZUH",
  "SPLUNK",
  "AI_ENGINE",
  "OTHER",
] as const;

export type IOCSource =
  (typeof IOC_SOURCES)[number];

export interface IOC {
  id: string;

  type: IOCType;

  value: string;

  description?: string | null;

  severity: IOCSeverity;

  confidence: number;

  firstSeen?: string | null;

  lastSeen?: string | null;

  status: IOCStatus;

  source: IOCSource;

  createdById: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateIOCRequest {
  type: IOCType;

  value: string;

  description?: string;

  severity: IOCSeverity;

  confidence?: number;

  firstSeen?: string;

  lastSeen?: string;

  source?: IOCSource;
}

export interface UpdateIOCRequest {
  description?: string;

  severity?: IOCSeverity;

  confidence?: number;

  status?: IOCStatus;

  firstSeen?: string;

  lastSeen?: string;
}

export interface IOCQueryParams {
  page?: number;

  limit?: number;

  type?: IOCType;

  severity?: IOCSeverity;

  status?: IOCStatus;

  source?: IOCSource;

  search?: string;
}

/**
 * =========================================================
 * API RESPONSES
 * =========================================================
 */

export type IOCResponse =
  ApiResponse<IOC>;

export type IOCListResponse =
  PaginatedApiResponse<IOC>;