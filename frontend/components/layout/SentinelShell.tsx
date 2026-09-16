"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import Navigation from "@/components/layout/Navigation";
import UserMenu from "@/components/layout/UserMenu";
import SentinelBackground from "@/components/layout/SentinelBackground";
import Link from "next/dist/client/link";

type SentinelShellProps = {
  children: React.ReactNode;
};

export default function SentinelShell({
  children,
}: SentinelShellProps) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Persistent visual environment */}
      <SentinelBackground />

      <div className="relative z-10 flex min-h-screen">
        {/* Navigation */}
        <aside className="hidden w-[240px] shrink-0 border-r border-white/10 bg-black/20 backdrop-blur-xl lg:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
            <div className="mb-8">
              <div className="text-lg font-semibold tracking-tight">
                SENTINEL-AI
              </div>

              <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40">
                SECURITY OPERATIONS
              </div>
            </div>

            <Navigation />
          </div>
        </aside>

        {/* Main application */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/10 px-6 backdrop-blur-xl">
            <div className="text-sm text-white/50">
              Security Operations Center
            </div>

            <div className="mb-10">
                <Link
                    href="/dashboard"
                    className="group inline-flex flex-col"
                >
                    <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                    SENTINEL-AI
                    </span>

                    <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-white/30 transition-colors group-hover:text-white/50">
                    Security Operations
                    </span>
                </Link>
            </div>

            <UserMenu />
          </header>

          {/* Animated route content */}
          <main className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.22,
                  ease: "easeOut",
                }}
                className="min-h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}