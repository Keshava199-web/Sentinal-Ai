"use client";

import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";

import StatCard from "./StatCard";

import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardStats() {
  const {
    totalIncidents,
    openIncidents,
    criticalIncidents,
    activeIOCs,
    isLoading,
    isError,
  } = useDashboardStats();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load dashboard statistics." />
    );
  }

  return (
    <section
      aria-label="Security metrics"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      <StatCard
        title="Total Incidents"
        value={totalIncidents}
        icon={Activity}
      />

      <StatCard
        title="Open Incidents"
        value={openIncidents}
        icon={AlertTriangle}
      />

      <StatCard
        title="Critical Incidents"
        value={criticalIncidents}
        icon={ShieldAlert}
      />

      <StatCard
        title="Active IOCs"
        value={activeIOCs}
        icon={ShieldCheck}
      />
    </section>
  );
}