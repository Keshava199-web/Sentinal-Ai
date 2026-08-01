import { api } from "@/lib/api";

import type {
  IncidentListResponse,
  IncidentResponse,
  CreateIncidentRequest,
  UpdateIncidentRequest,
  IncidentQueryParams,
} from "@/types/incident";

/**
 * =========================================================
 * GET ALL INCIDENTS
 * =========================================================
 */
export const getIncidents = async (
  params?: IncidentQueryParams,
): Promise<IncidentListResponse> => {
  const { data } = await api.get<IncidentListResponse>(
    "/incidents",
    {
      params,
    },
  );

  return data;
};

/**
 * =========================================================
 * GET INCIDENT BY ID
 * =========================================================
 */
export const getIncidentById = async (
  id: string,
): Promise<IncidentResponse> => {
  const { data } = await api.get<IncidentResponse>(
    `/incidents/${id}`,
  );

  return data;
};

/**
 * =========================================================
 * CREATE INCIDENT
 * =========================================================
 */
export const createIncident = async (
  payload: CreateIncidentRequest,
): Promise<IncidentResponse> => {
  const { data } = await api.post<IncidentResponse>(
    "/incidents",
    payload,
  );

  return data;
};

/**
 * =========================================================
 * UPDATE INCIDENT
 * =========================================================
 */
export const updateIncident = async (
  id: string,
  payload: UpdateIncidentRequest,
): Promise<IncidentResponse> => {
  const { data } = await api.patch<IncidentResponse>(
    `/incidents/${id}`,
    payload,
  );

  return data;
};

/**
 * =========================================================
 * DELETE INCIDENT
 * =========================================================
 */
export const deleteIncident = async (
  id: string,
): Promise<void> => {
  await api.delete(`/incidents/${id}`);
};