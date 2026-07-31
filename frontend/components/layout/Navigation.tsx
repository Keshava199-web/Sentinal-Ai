"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;

        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5" />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}