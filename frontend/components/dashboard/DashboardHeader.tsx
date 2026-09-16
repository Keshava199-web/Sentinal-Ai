"use client";

import { ArrowUpRight, Command } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          Security Operations
        </div>

        <h1 className="text-4xl font-medium tracking-[-0.035em] text-white md:text-5xl">
          Security overview
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
          Monitor incidents, indicators of compromise, alerts,
          and security activity across Sentinel-AI.
        </p>
      </div>

      <button
        type="button"
        className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/60 backdrop-blur-xl transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        <Command className="h-3.5 w-3.5" />

        <span>Search Sentinel</span>

        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-white/30">
          K
        </span>

        <ArrowUpRight className="h-3.5 w-3.5 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </header>
  );
}