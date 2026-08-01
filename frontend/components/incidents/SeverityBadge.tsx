"use client";

import { Badge } from "@/components/ui/badge";

import type {
  IncidentSeverity,
} from "@/types/incident";

interface SeverityBadgeProps {
  severity: IncidentSeverity;
}

const severityVariants: Record<
  IncidentSeverity,
  string
> = {
  LOW:
    "bg-green-100 text-green-700 border-green-300",

  MEDIUM:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  HIGH:
    "bg-orange-100 text-orange-700 border-orange-300",

  CRITICAL:
    "bg-red-100 text-red-700 border-red-300",
};

export default function SeverityBadge({
  severity,
}: SeverityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={severityVariants[severity]}
    >
      {severity}
    </Badge>
  );
}