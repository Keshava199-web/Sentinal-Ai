"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

import { useIncidents } from "@/hooks/useIncidents";

const severityConfig = {
  LOW: {
    label: "Low",
    indicator: "bg-emerald-400",
    glow: "bg-emerald-400/[0.08]",
  },
  MEDIUM: {
    label: "Medium",
    indicator: "bg-amber-400",
    glow: "bg-amber-400/[0.08]",
  },
  HIGH: {
    label: "High",
    indicator: "bg-orange-400",
    glow: "bg-orange-400/[0.08]",
  },
  CRITICAL: {
    label: "Critical",
    indicator: "bg-red-400",
    glow: "bg-red-400/[0.08]",
  },
} as const;

type Severity = keyof typeof severityConfig;

export default function SeverityOverview() {
  const { data, isPending, isError } = useIncidents();

  const incidents = data?.data ?? [];

  const counts: Record<Severity, number> = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0,
  };

  incidents.forEach((incident) => {
    counts[incident.severity]++;
  });

  const total = incidents.length;

  return (
    <section aria-labelledby="severity-overview-heading">
      <div className="mb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
          Threat Posture
        </p>

        <div className="mt-2 flex items-center justify-between">
          <h2
            id="severity-overview-heading"
            className="text-xl font-medium tracking-[-0.025em] text-white"
          >
            Severity distribution
          </h2>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/25">
            <Activity className="h-3 w-3" strokeWidth={1.6} />
            {total} observed
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl"
        />

        {isPending ? (
          <div className="space-y-5 py-2">
            {Object.keys(severityConfig).map((severity) => (
              <div key={severity} className="animate-pulse">
                <div className="mb-2 h-3 w-20 rounded bg-white/[0.06]" />
                <div className="h-1.5 rounded-full bg-white/[0.06]" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[180px] items-center justify-center text-center">
            <p className="text-xs text-white/35">
              Unable to load severity data.
            </p>
          </div>
        ) : total === 0 ? (
          <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
              <Activity
                className="h-4 w-4 text-white/30"
                strokeWidth={1.6}
              />
            </div>

            <p className="mt-4 text-sm text-white/50">
              No incident data
            </p>

            <p className="mt-1 text-xs text-white/25">
              Severity distribution will appear here.
            </p>
          </div>
        ) : (
          <div className="relative space-y-5">
            {(Object.keys(severityConfig) as Severity[]).map(
              (severity, index) => {
                const config = severityConfig[severity];
                const count = counts[severity];
                const percentage = (count / total) * 100;

                return (
                  <motion.div
                    key={severity}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${config.indicator}`}
                        />

                        <span className="text-xs font-medium text-white/60">
                          {config.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/25">
                          {percentage.toFixed(0)}%
                        </span>

                        <span className="min-w-5 text-right text-xs font-medium text-white/65">
                          {count}
                        </span>
                      </div>
                    </div>

                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${config.indicator}`}
                      />
                    </div>
                  </motion.div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}