import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteIncident } from "@/services/incident.service";

import { queryKeys } from "@/lib/queryKeys";

export function useDeleteIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIncident,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.incidents,
      });
    },
  });
}