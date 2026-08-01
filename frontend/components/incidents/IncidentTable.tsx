"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IncidentRow from "./IncidentRow";

import type {
  Incident,
} from "@/types/incident";

import type { ActionHandler } from "@/types/common";

interface IncidentTableProps {
  incidents: Incident[];

  onView?: ActionHandler<Incident>;

  onEdit?: ActionHandler<Incident>;

  onDelete?: ActionHandler<Incident>;
}

export default function IncidentTable({
  incidents,
  onView,
  onEdit,
  onDelete,
}: IncidentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>

          <TableHead>Title</TableHead>

          <TableHead>Severity</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Assigned</TableHead>

          <TableHead>Created</TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {incidents.map((incident) => (
            <IncidentRow
            key={incident.id}
            incident={incident}
            {...(onView ? { onView } : {})}
            {...(onEdit ? { onEdit } : {})}
            {...(onDelete ? { onDelete } : {})}
            />
        ))}
        </TableBody>
    </Table>
  );
}