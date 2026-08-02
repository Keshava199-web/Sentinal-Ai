"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IOCRow from "./IOCRow";

import type { IOC } from "@/types/ioc";
import type { ActionHandler } from "@/types/common";

interface IOCTableProps {
  iocs: IOC[];

  onEdit?: ActionHandler<IOC>;

  onDelete?: ActionHandler<IOC>;
}

export default function IOCTable({
  iocs,
  onEdit,
  onDelete,
}: IOCTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>

          <TableHead>Value</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Confidence</TableHead>

          <TableHead>Source</TableHead>

          <TableHead>Created</TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {iocs.map((ioc) => (
          <IOCRow
            key={ioc.id}
            ioc={ioc}
            {...(onEdit && { onEdit })}
            {...(onDelete && { onDelete })}
            />
        ))}
      </TableBody>
    </Table>
  );
}