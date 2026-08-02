"use client";

import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import IOCTypeBadge from "./IOCTypeBadge";
import IOCStatusBadge from "./IOCStatusBadge";
import IOCConfidenceBadge from "./IOCConfidenceBadge";

import type { IOC } from "@/types/ioc";
import type { ActionHandler } from "@/types/common";

interface IOCRowProps {
  ioc: IOC;

  onEdit?: ActionHandler<IOC>;

  onDelete?: ActionHandler<IOC>;
}

export default function IOCRow({
  ioc,
  onEdit,
  onDelete,
}: IOCRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-4 py-3">
        <IOCTypeBadge type={ioc.type} />
      </td>

      <td className="px-4 py-3 font-mono">
        {ioc.value}
      </td>

      <td className="px-4 py-3">
        <IOCStatusBadge status={ioc.status} />
      </td>

      <td className="px-4 py-3">
        <IOCConfidenceBadge
          confidence={ioc.confidence}
        />
      </td>

      <td className="px-4 py-3">
        {ioc.source}
      </td>

      <td className="px-4 py-3">
        {new Date(
          ioc.createdAt,
        ).toLocaleString()}
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link
            href={`/dashboard/iocs/${ioc.id}`}
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
              onEdit?.(ioc)
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              onDelete?.(ioc)
            }
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </td>
    </tr>
  );
}