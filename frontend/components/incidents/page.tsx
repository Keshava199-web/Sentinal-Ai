"use client";

import IncidentTable from "@/components/incidents/IncidentTable";

import { useIncidents } from "@/hooks/useIncidents";

export default function IncidentsPage() {
  const {
    data,
    isPending,
    isError,
  } = useIncidents();

  if (isPending) {
    return (
      <div className="p-6">
        Loading incidents...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-destructive">
        Failed to load incidents.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        Incident Management
      </h1>

      <IncidentTable
        incidents={data?.data ?? []}
      />
    </div>
  );
}