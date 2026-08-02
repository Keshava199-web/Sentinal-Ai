import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createIOC } from "@/services/ioc.service";

import { queryKeys } from "@/lib/queryKeys";

/**
 * =========================================================
 * CREATE IOC
 * =========================================================
 */

export function useCreateIOC() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createIOC,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.iocs,
      });
    },
  });
}