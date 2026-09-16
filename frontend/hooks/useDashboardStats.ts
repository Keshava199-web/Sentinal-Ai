import { useMemo } from "react";

import { useIncidents } from "@/hooks/useIncidents";
import { useIOCs } from "@/hooks/useIOCs";

export function useDashboardStats() {
  const incidentsQuery = useIncidents();
  const iocsQuery = useIOCs();

  const stats = useMemo(() => {
    const incidents =
      incidentsQuery.data?.data ?? [];

    const iocs =
      iocsQuery.data?.data ?? [];

    return {
      totalIncidents:
        incidents.length,

      openIncidents:
        incidents.filter(
          (i) => i.status === "OPEN",
        ).length,

      criticalIncidents:
        incidents.filter(
          (i) =>
            i.severity ===
            "CRITICAL",
        ).length,

      activeIOCs:
        iocs.filter(
          (i) =>
            i.status === "ACTIVE",
        ).length,
    };
  }, [
    incidentsQuery.data,
    iocsQuery.data,
  ]);

  return {
    ...stats,

    isLoading:
      incidentsQuery.isPending ||
      iocsQuery.isPending,

    isError:
      incidentsQuery.isError ||
      iocsQuery.isError,
  };
}