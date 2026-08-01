import { useQuery } from "@tanstack/react-query";

import { getIncidents } from "@/services/incident.service";
import { IncidentQueryParams } from "@/types/incident";
import { queryKeys } from "@/lib/queryKeys";

/**
 * =========================================================
 * Fetch Incident List
 * =========================================================
 */
export function useIncidents(
  params?: IncidentQueryParams,
) {
  return useQuery({
    queryKey: [...queryKeys.incidents, params],

    queryFn: () =>
      getIncidents(params),

    staleTime: 60 * 1000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}