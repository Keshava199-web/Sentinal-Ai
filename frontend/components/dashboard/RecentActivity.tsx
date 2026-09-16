"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentActivity() {
  return (
    <section aria-labelledby="recent-activity-heading">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
            System Telemetry
          </p>

          <h2
            id="recent-activity-heading"
            className="mt-2 text-xl font-medium tracking-[-0.025em] text-white"
          >
            Recent activity
          </h2>
        </div>

        <Link
          href="/dashboard/timeline"
          className="group hidden items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/75 sm:flex"
        >
          Open timeline
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.6}
          />
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl"
        />

        <div className="relative flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]"
          >
            <Clock3
              className="h-4 w-4 text-white/35"
              strokeWidth={1.5}
            />

            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#030405] bg-amber-400/70"
            />
          </motion.div>

          <p className="mt-4 text-sm font-medium text-white/55">
            Timeline service pending
          </p>

          <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/25">
            Security activity will appear here once the timeline service is
            integrated.
          </p>

          <div className="mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/20">
            <Radio
              className="h-3 w-3"
              strokeWidth={1.5}
            />
            Awaiting telemetry
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/timeline"
        className="group mt-3 flex items-center justify-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/70 sm:hidden"
      >
        Open timeline
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.6}
        />
      </Link>
    </section>
  );
}