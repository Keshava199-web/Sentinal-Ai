import { useQuery } from "@tanstack/react-query";

import { getIncidentById } from "@/services/incident.service";

import { queryKeys } from "@/lib/queryKeys";

export function useIncident(
  id: string,
) {
  return useQuery({
    queryKey: queryKeys.incident(id),

    queryFn: () =>
      getIncidentById(id),

    enabled: !!id,

    staleTime: 60 * 1000,

    retry: 1,
  });
}