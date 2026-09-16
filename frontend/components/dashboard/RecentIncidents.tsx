"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldAlert } from "lucide-react";

import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";

import SeverityBadge from "@/components/incidents/SeverityBadge";
import StatusBadge from "@/components/incidents/StatusBadge";

import { useIncidents } from "@/hooks/useIncidents";

export default function RecentIncidents() {
  const { data, isPending, isError } = useIncidents({
    page: 1,
    limit: 5,
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load recent incidents." />
    );
  }

  const incidents = data?.data ?? [];

  return (
    <section aria-labelledby="recent-incidents-heading">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
            Investigations
          </p>

          <h2
            id="recent-incidents-heading"
            className="mt-2 text-xl font-medium tracking-[-0.025em] text-white"
          >
            Recent incidents
          </h2>
        </div>

        <Link
          href="/dashboard/incidents"
          className="group hidden items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/75 sm:flex"
        >
          View all
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.6}
          />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">
        {incidents.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
              <ShieldAlert
                className="h-4 w-4 text-white/30"
                strokeWidth={1.6}
              />
            </div>

            <p className="mt-4 text-sm text-white/55">
              No incidents available.
            </p>

            <p className="mt-1 text-xs text-white/25">
              New investigations will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/dashboard/incidents/${incident.id}`}
                  className="group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.035]"
                >
                  {/* Active row indicator */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-3 left-0 w-px bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                  />

                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] sm:flex">
                      <ShieldAlert
                        className="h-3.5 w-3.5 text-white/35 transition-colors group-hover:text-white/65"
                        strokeWidth={1.6}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                        {incident.title}
                      </p>

                      <p className="mt-1 text-[11px] text-white/30">
                        {new Date(incident.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <SeverityBadge severity={incident.severity} />

                    <StatusBadge status={incident.status} />
                  </div>

                  <ArrowUpRight
                    className="hidden h-4 w-4 shrink-0 text-white/15 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50 sm:block"
                    strokeWidth={1.5}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Link
        href="/dashboard/incidents"
        className="group mt-3 flex items-center justify-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/70 sm:hidden"
      >
        View all incidents
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.6}
        />
      </Link>
    </section>
  );
}