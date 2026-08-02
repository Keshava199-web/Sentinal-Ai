import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateIOC } from "@/services/ioc.service";

import type {
  UpdateIOCRequest,
} from "@/types/ioc";

import { queryKeys } from "@/lib/queryKeys";

interface UpdateIOCPayload {
  id: string;

  data: UpdateIOCRequest;
}

/**
 * =========================================================
 * UPDATE IOC
 * =========================================================
 */

export function useUpdateIOC() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateIOCPayload) =>
      updateIOC(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          queryKeys.iocs,
      });
    },
  });
}