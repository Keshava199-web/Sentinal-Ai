import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createIncident } from "@/services/incident.service";

import { queryKeys } from "@/lib/queryKeys";

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.incidents,
      });
    },
  });
}