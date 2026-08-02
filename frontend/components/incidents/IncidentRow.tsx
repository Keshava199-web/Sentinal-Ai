"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

import type {
  Incident,
} from "@/types/incident";

import type { ActionHandler } from "@/types/common";

import Link from "next/link";

interface IncidentRowProps {
  incident: Incident;

  onEdit?: ActionHandler<Incident>;

  onDelete?: ActionHandler<Incident>;
}

export default function IncidentRow({
  incident,
  onEdit,
  onDelete,
}: IncidentRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-4 py-3 font-mono text-xs">
        {incident.id.slice(0, 8)}
      </td>

      <td className="px-4 py-3">
        {incident.title}
      </td>

      <td className="px-4 py-3">
        <SeverityBadge
          severity={incident.severity}
        />
      </td>

      <td className="px-4 py-3">
        <StatusBadge
          status={incident.status}
        />
      </td>

      <td className="px-4 py-3">
        {incident.assignedToId ?? "—"}
      </td>

      <td className="px-4 py-3 text-sm text-muted-foreground">
        {new Date(
          incident.createdAt,
        ).toLocaleString()}
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link
            href={`/dashboard/incidents/${incident.id}`}
            aria-label="View incident"
          >
            <Button
              size="icon"
              variant="ghost"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              onEdit?.(incident)
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              onDelete?.(incident)
            }
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </td>
    </tr>
  );
}