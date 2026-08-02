"use client";

import { useParams } from "next/navigation";

import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";

import IncidentHeader from "@/components/incidents/details/IncidentHeader";
import IncidentOverviewCard from "@/components/incidents/details/IncidentOverviewCard";
import IncidentMetadataCard from "@/components/incidents/details/IncidentMetadataCard";
import IncidentTimeline from "@/components/incidents/details/IncidentTimeline";
import IncidentIOCPanel from "@/components/incidents/details/IncidentIOCPanel";
import IncidentEvidencePanel from "@/components/incidents/details/IncidentEvidencePanel";
import IncidentNotesPanel from "@/components/incidents/details/IncidentNotesPanel";

import { useIncident } from "@/hooks/useIncident";

export default function IncidentDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data,
    isPending,
    isError,
  } = useIncident(id);

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        message="Unable to load incident."
      />
    );
  }

  const incident = data.data;

  return (
    <div className="space-y-6 p-6">
      <IncidentHeader incident={incident} />

      <div className="grid gap-6 lg:grid-cols-2">
        <IncidentOverviewCard
          incident={incident}
        />

        <IncidentMetadataCard
          incident={incident}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <IncidentTimeline />

        <IncidentIOCPanel />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <IncidentEvidencePanel />

        <IncidentNotesPanel />
      </div>
    </div>
  );
}