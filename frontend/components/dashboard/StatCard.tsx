"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      whileHover={{
        y: -2,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.055]"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.035] blur-3xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
            {title}
          </p>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-4xl font-medium tracking-[-0.04em] text-white">
              {value}
            </span>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
          <Icon
            className="h-4 w-4 text-white/45 transition-colors duration-300 group-hover:text-white/75"
            strokeWidth={1.6}
          />
        </div>
      </div>

      {/* Optional real description */}
      {description && (
        <p className="relative mt-4 text-xs text-white/35">
          {description}
        </p>
      )}

      {/* Bottom indicator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.article>
  );
}