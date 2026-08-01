"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import IncidentTable from "@/components/incidents/IncidentTable";
import CreateIncidentDialog from "@/components/incidents/CreateIncidentDialog";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";

import { useIncidents } from "@/hooks/useIncidents";

export default function IncidentsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  const {
    data,
    isPending,
    isError,
  } = useIncidents();

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load incidents." />
    );
  }

  const incidents = data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Incident Management
          </h1>

          <p className="text-muted-foreground">
            Manage and investigate security incidents.
          </p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
        >
          Create Incident
        </Button>
      </div>

      {incidents.length === 0 ? (
        <EmptyState
          title="No Incidents Found"
          description="Create your first incident to begin monitoring."
        />
      ) : (
        <IncidentTable
          incidents={incidents}
        />
      )}

      <CreateIncidentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
}