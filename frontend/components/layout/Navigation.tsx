"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { SIDEBAR_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="flex flex-col gap-6"
    >
      <div>
        <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
          Overview
        </p>

        <NavigationItem
          item={SIDEBAR_ITEMS[0]}
          pathname={pathname}
        />
      </div>

      <div>
        <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
          Operations
        </p>

        <div className="space-y-1">
          {SIDEBAR_ITEMS.slice(1, 5).map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              pathname={pathname}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/30">
          Administration
        </p>

        <NavigationItem
          item={SIDEBAR_ITEMS[5]}
          pathname={pathname}
        />
      </div>
    </nav>
  );
}

type NavigationItemProps = {
  item: (typeof SIDEBAR_ITEMS)[number];
  pathname: string;
};

function NavigationItem({
  item,
  pathname,
}: NavigationItemProps) {
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
        isActive
          ? "text-white"
          : "text-white/45 hover:text-white/85",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-navigation"
          className="absolute inset-0 rounded-lg bg-white/[0.07]"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
          }}
        />
      )}

      {isActive && (
        <motion.div
          layoutId="active-navigation-indicator"
          className="absolute left-0 h-5 w-px rounded-full bg-white"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
          }}
        />
      )}

      <Icon
        className={cn(
          "relative z-10 h-[17px] w-[17px] transition-colors duration-200",
          isActive
            ? "text-white"
            : "text-white/35 group-hover:text-white/70",
        )}
        strokeWidth={1.7}
      />

      <span className="relative z-10">
        {item.label}
      </span>
    </Link>
  );
}