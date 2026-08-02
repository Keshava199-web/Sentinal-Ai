"use client";

import { useParams } from "next/navigation";

import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";

import IOCHeader from "@/components/iocs/details/IOCHeader";
import IOCOverviewCard from "@/components/iocs/details/IOCOverviewCard";
import IOCMetadataCard from "@/components/iocs/details/IOCMetadataCard";
import IOCLinkedIncidentsCard from "@/components/iocs/details/IOCLinkedIncidentsCard";

import { useIOC } from "@/hooks/useIOC";

export default function IOCDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data,
    isPending,
    isError,
  } = useIOC(id);

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return (
      <ErrorState message="Failed to load IOC." />
    );
  }

  const ioc = data.data;

  return (
    <div className="space-y-6 p-6">
      <IOCHeader ioc={ioc} />

      <div className="grid gap-6 lg:grid-cols-2">
        <IOCOverviewCard ioc={ioc} />

        <IOCMetadataCard ioc={ioc} />
      </div>

      <IOCLinkedIncidentsCard
        ioc={ioc}
      />
    </div>
  );
}