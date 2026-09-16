"use client";

import Link from "next/link";
import { ArrowUpRight, Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

import type { Incident } from "@/types/incident";
import type { ActionHandler } from "@/types/common";

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
    <tr className="group border-b border-white/[0.06] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.035]">
      {/* Incident */}
      <td className="px-5 py-4">
        <Link
          href={`/dashboard/incidents/${incident.id}`}
          className="group/incident block min-w-[220px]"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/25">
              {incident.id.slice(0, 8)}
            </span>

            <ArrowUpRight
              className="h-3.5 w-3.5 text-white/15 opacity-0 transition-all duration-200 group-hover/incident:-translate-y-0.5 group-hover/incident:translate-x-0.5 group-hover/incident:text-white/55 group-hover/incident:opacity-100"
              strokeWidth={1.5}
            />
          </div>

          <p className="mt-1.5 max-w-[280px] truncate text-sm font-medium text-white/75 transition-colors group-hover/incident:text-white">
            {incident.title}
          </p>
        </Link>
      </td>

      {/* Severity */}
      <td className="whitespace-nowrap px-5 py-4">
        <SeverityBadge severity={incident.severity} />
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge status={incident.status} />
      </td>

      {/* Assigned */}
      <td className="px-5 py-4">
        <span
          title={incident.assignedToId ?? undefined}
          className="block max-w-[160px] truncate font-mono text-[11px] text-white/35"
        >
          {incident.assignedToId
            ? incident.assignedToId.slice(0, 12)
            : "Unassigned"}
        </span>
      </td>

      {/* Created */}
      <td className="whitespace-nowrap px-5 py-4">
        <time
          dateTime={incident.createdAt}
          className="text-xs text-white/35"
        >
          {new Date(incident.createdAt).toLocaleString()}
        </time>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-1 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
          <Link
            href={`/dashboard/incidents/${incident.id}`}
            aria-label={`View incident ${incident.id.slice(0, 8)}`}
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-white/35 hover:bg-white/[0.07] hover:text-white"
            >
              <Eye
                className="h-3.5 w-3.5"
                strokeWidth={1.6}
              />
            </Button>
          </Link>

          {onEdit && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Edit incident"
              className="h-8 w-8 rounded-lg text-white/35 hover:bg-white/[0.07] hover:text-white"
              onClick={() => onEdit(incident)}
            >
              <Pencil
                className="h-3.5 w-3.5"
                strokeWidth={1.6}
              />
            </Button>
          )}

          {onDelete && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Delete incident"
              className="h-8 w-8 rounded-lg text-white/35 hover:bg-red-500/[0.08] hover:text-red-300"
              onClick={() => onDelete(incident)}
            >
              <Trash2
                className="h-3.5 w-3.5"
                strokeWidth={1.6}
              />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}