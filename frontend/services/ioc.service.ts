import { api } from "@/lib/api";

import type {
  IOCListResponse,
  IOCResponse,
  CreateIOCRequest,
  UpdateIOCRequest,
  IOCQueryParams,
} from "@/types/ioc";

/**
 * =========================================================
 * GET ALL IOCs
 * =========================================================
 */

export const getIOCs = async (
  params?: IOCQueryParams,
): Promise<IOCListResponse> => {
  const { data } = await api.get<IOCListResponse>(
    "/iocs",
    {
      params,
    },
  );

  return data;
};

/**
 * =========================================================
 * GET IOC BY ID
 * =========================================================
 */

export const getIOCById = async (
  id: string,
): Promise<IOCResponse> => {
  const { data } = await api.get<IOCResponse>(
    `/iocs/${id}`,
  );

  return data;
};

/**
 * =========================================================
 * CREATE IOC
 * =========================================================
 */

export const createIOC = async (
  payload: CreateIOCRequest,
): Promise<IOCResponse> => {
  const { data } = await api.post<IOCResponse>(
    "/iocs",
    payload,
  );

  return data;
};

/**
 * =========================================================
 * UPDATE IOC
 * =========================================================
 */

export const updateIOC = async (
  id: string,
  payload: UpdateIOCRequest,
): Promise<IOCResponse> => {
  const { data } = await api.patch<IOCResponse>(
    `/iocs/${id}`,
    payload,
  );

  return data;
};

/**
 * =========================================================
 * DELETE IOC
 * =========================================================
 */

export const deleteIOC = async (
  id: string,
): Promise<void> => {
  await api.delete(`/iocs/${id}`);
};