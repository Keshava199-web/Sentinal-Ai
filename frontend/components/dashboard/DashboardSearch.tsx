"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function DashboardSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search incidents, IOCs..."
        className="pl-10"
      />
    </div>
  );
}