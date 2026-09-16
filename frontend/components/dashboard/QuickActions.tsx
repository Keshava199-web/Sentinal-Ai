"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Database,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";

const actions = [
  {
    label: "Incident Management",
    description: "Review and investigate active incidents",
    href: "/dashboard/incidents",
    icon: ShieldAlert,
  },
  {
    label: "IOC Management",
    description: "Search indicators of compromise",
    href: "/dashboard/iocs",
    icon: Database,
  },
  {
    label: "Timeline",
    description: "Inspect security events chronologically",
    href: "/dashboard/timeline",
    icon: Activity,
  },
  {
    label: "Create Incident",
    description: "Open a new security investigation",
    href: "/dashboard/incidents",
    icon: PlusCircle,
  },
] as const;

export default function QuickActions() {
  return (
    <section aria-labelledby="command-center-heading">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
            Command Center
          </p>

          <h2
            id="command-center-heading"
            className="mt-2 text-xl font-medium tracking-[-0.025em] text-white"
          >
            Security operations
          </h2>
        </div>

        <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/25 sm:block">
          Select an operation
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.href + action.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                href={action.href}
                className="group relative flex min-h-[132px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
              >
                {/* Ambient hover light */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.04] blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex w-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                      <Icon
                        className="h-4 w-4 text-white/45 transition-colors duration-300 group-hover:text-white/80"
                        strokeWidth={1.6}
                      />
                    </div>

                    <ArrowUpRight
                      className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                      {action.label}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-white/35">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}