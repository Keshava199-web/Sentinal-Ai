"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import IncidentTable from "@/components/incidents/IncidentTable";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import CreateIncidentDialog from "@/components/incidents/CreateIncidentDialog";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import Pagination from "@/components/shared/Pagination";

import { useIncidents } from "@/hooks/useIncidents";

import type {
  IncidentSeverity,
  IncidentStatus,
  IncidentQueryParams,
} from "@/types/incident";

export default function IncidentsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] =
    useState<IncidentSeverity | "">("");
  const [status, setStatus] =
    useState<IncidentStatus | "">("");

  const queryParams: IncidentQueryParams = {
    page,
    limit: 10,
    search,
    ...(severity ? { severity } : {}),
    ...(status ? { status } : {}),
  };

  const {
    data,
    isPending,
    isError,
  } = useIncidents(queryParams);

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-[1800px] px-6 py-8 lg:px-10 lg:py-10">
        <ErrorState message="Failed to load incidents." />
      </main>
    );
  }

  const incidents = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <main className="mx-auto w-full max-w-[1800px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-5 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/30">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              Security investigations
            </div>

            <h1 className="text-4xl font-medium tracking-[-0.035em] text-white md:text-5xl">
              Incidents
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Investigate, track, and manage security incidents across
              Sentinel-AI.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="group h-10 w-fit rounded-full border border-white/10 bg-white/[0.08] px-4 text-xs font-medium text-white shadow-none transition-all hover:bg-white/[0.14]"
          >
            <Plus
              className="mr-2 h-3.5 w-3.5"
              strokeWidth={1.8}
            />
            Create incident
            <ArrowUpRight
              className="ml-2 h-3.5 w-3.5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.6}
            />
          </Button>
        </motion.header>

        {/* Investigation context */}
        <section
          aria-label="Incident workspace"
          className="grid gap-3 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 backdrop-blur-xl">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Current page
            </p>

            <p className="mt-1.5 text-sm text-white/65">
              {incidents.length} incidents
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 backdrop-blur-xl">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Page
            </p>

            <p className="mt-1.5 text-sm text-white/65">
              {page} <span className="text-white/25">/</span>{" "}
              {totalPages}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 backdrop-blur-xl">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Workspace
            </p>

            <div className="mt-1.5 flex items-center gap-2 text-sm text-white/65">
              <ShieldAlert
                className="h-3.5 w-3.5 text-white/35"
                strokeWidth={1.6}
              />
              Investigation mode
            </div>
          </div>
        </section>

        {/* Filters */}
        <section
          aria-label="Incident filters"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 backdrop-blur-xl"
        >
          <IncidentFilters
            search={search}
            severity={severity}
            status={status}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onSeverityChange={(value) => {
              setSeverity(value);
              setPage(1);
            }}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onReset={() => {
              setSearch("");
              setSeverity("");
              setStatus("");
              setPage(1);
            }}
          />
        </section>

        {/* Results */}
        {incidents.length === 0 ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl"
          >
            <EmptyState
              title="No incidents found"
              description="Try adjusting your filters or create a new incident."
            />
          </motion.section>
        ) : (
          <section
            aria-label="Incident results"
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                  Investigation queue
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Showing {incidents.length} incident
                  {incidents.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">
              <IncidentTable incidents={incidents} />
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </section>
        )}
      </div>

      <CreateIncidentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </main>
  );
}