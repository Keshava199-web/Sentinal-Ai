"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Database } from "lucide-react";

import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";

import IOCTypeBadge from "@/components/iocs/IOCTypeBadge";
import IOCStatusBadge from "@/components/iocs/IOCStatusBadge";

import { useIOCs } from "@/hooks/useIOCs";

export default function RecentIOCs() {
  const { data, isPending, isError } = useIOCs({
    page: 1,
    limit: 5,
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState message="Failed to load recent IOCs." />;
  }

  const iocs = data?.data ?? [];

  return (
    <section aria-labelledby="recent-iocs-heading">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
            Threat Intelligence
          </p>

          <h2
            id="recent-iocs-heading"
            className="mt-2 text-xl font-medium tracking-[-0.025em] text-white"
          >
            Recent IOCs
          </h2>
        </div>

        <Link
          href="/dashboard/iocs"
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
        {iocs.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
              <Database
                className="h-4 w-4 text-white/30"
                strokeWidth={1.6}
              />
            </div>

            <p className="mt-4 text-sm text-white/55">
              No IOCs available.
            </p>

            <p className="mt-1 text-xs text-white/25">
              New indicators will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {iocs.map((ioc, index) => (
              <motion.div
                key={ioc.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/dashboard/iocs/${ioc.id}`}
                  className="group relative flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.035]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-3 left-0 w-px bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                  />

                  <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] sm:flex">
                    <Activity
                      className="h-3.5 w-3.5 text-white/35 transition-colors group-hover:text-white/65"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      title={ioc.value}
                      className="truncate font-mono text-xs text-white/75 transition-colors group-hover:text-white"
                    >
                      {ioc.value}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-white/30">
                      Source: {ioc.source}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <IOCTypeBadge type={ioc.type} />
                    <IOCStatusBadge status={ioc.status} />
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
        href="/dashboard/iocs"
        className="group mt-3 flex items-center justify-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/70 sm:hidden"
      >
        View all IOCs
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.6}
        />
      </Link>
    </section>
  );
}