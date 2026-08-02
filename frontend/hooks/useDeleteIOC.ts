import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteIOC } from "@/services/ioc.service";

import { queryKeys } from "@/lib/queryKeys";

/**
 * =========================================================
 * DELETE IOC
 * =========================================================
 */

export function useDeleteIOC() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteIOC,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.iocs,
      });
    },
  });
}