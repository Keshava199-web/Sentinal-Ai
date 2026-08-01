"use client";

import { Badge } from "@/components/ui/badge";

import type {
  IncidentStatus,
} from "@/types/incident";

interface StatusBadgeProps {
  status: IncidentStatus;
}

const statusVariants: Record<
  IncidentStatus,
  string
> = {
  OPEN:
    "bg-red-100 text-red-700 border-red-300",

  INVESTIGATING:
    "bg-blue-100 text-blue-700 border-blue-300",

  RESOLVED:
    "bg-green-100 text-green-700 border-green-300",

  CLOSED:
    "bg-gray-100 text-gray-700 border-gray-300",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={statusVariants[status]}
    >
      {status}
    </Badge>
  );
}