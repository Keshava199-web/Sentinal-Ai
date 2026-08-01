import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteIncident } from "@/services/incident.service";

export function useDeleteIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIncident,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.incidents,
      });
    },
  });
}