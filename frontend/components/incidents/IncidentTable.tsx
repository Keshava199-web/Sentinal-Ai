"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IncidentRow from "./IncidentRow";

import type { Incident } from "@/types/incident";
import type { ActionHandler } from "@/types/common";

interface IncidentTableProps {
  incidents: Incident[];
  onEdit?: ActionHandler<Incident>;
  onDelete?: ActionHandler<Incident>;
}

export default function IncidentTable({
  incidents,
  onEdit,
  onDelete,
}: IncidentTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/[0.08] hover:bg-transparent">
            <TableHead className="px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Incident
            </TableHead>

            <TableHead className="px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Severity
            </TableHead>

            <TableHead className="px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Status
            </TableHead>

            <TableHead className="px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Assigned
            </TableHead>

            <TableHead className="px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Created
            </TableHead>

            <TableHead className="px-5 py-3 text-right text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {incidents.map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              {...(onEdit ? { onEdit } : {})}
              {...(onDelete ? { onDelete } : {})}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}