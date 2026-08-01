import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateIncident } from "@/services/incident.service";

import { queryKeys } from "@/lib/queryKeys";

import type {
  UpdateIncidentRequest,
} from "@/types/incident";

interface UpdateIncidentPayload {
  id: string;
  payload: UpdateIncidentRequest;
}

export function useUpdateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateIncidentPayload) =>
      updateIncident(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.incidents,
      });
    },
  });
}