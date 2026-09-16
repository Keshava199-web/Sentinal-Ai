"use client";

import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  IOC_TYPES,
  IOC_SEVERITIES,
  IOC_STATUSES,
  type IOCType,
  type IOCSeverity,
  type IOCStatus,
} from "@/types/ioc";

interface IOCFiltersProps {
  search: string;
  type: IOCType | "";
  severity: IOCSeverity | "";
  status: IOCStatus | "";

  onSearchChange: (value: string) => void;
  onTypeChange: (value: IOCType | "") => void;
  onSeverityChange: (
    value: IOCSeverity | "",
  ) => void;
  onStatusChange: (
    value: IOCStatus | "",
  ) => void;

  onReset: () => void;
}

export default function IOCFilters({
  search,
  type,
  severity,
  status,
  onSearchChange,
  onTypeChange,
  onSeverityChange,
  onStatusChange,
  onReset,
}: IOCFiltersProps) {
  return (
    <div className="grid gap-4 rounded-lg border p-4 lg:grid-cols-5">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search IOCs..."
          className="pl-10"
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <select
        className="rounded-md border px-3 py-2"
        value={type}
        onChange={(e) =>
          onTypeChange(
            e.target.value as IOCType | "",
          )
        }
      >
        <option value="">
          All Types
        </option>

        {IOC_TYPES.map((type) => (
          <option
            key={type}
            value={type}
          >
            {type}
          </option>
        ))}
      </select>

      <select
        className="rounded-md border px-3 py-2"
        value={severity}
        onChange={(e) =>
          onSeverityChange(
            e.target.value as
              | IOCSeverity
              | "",
          )
        }
      >
        <option value="">
          All Severities
        </option>

        {IOC_SEVERITIES.map(
          (severity) => (
            <option
              key={severity}
              value={severity}
            >
              {severity}
            </option>
          ),
        )}
      </select>

      <select
        className="rounded-md border px-3 py-2"
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value as
              | IOCStatus
              | "",
          )
        }
      >
        <option value="">
          All Statuses
        </option>

        {IOC_STATUSES.map(
          (status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ),
        )}
      </select>

      <Button
        variant="outline"
        onClick={onReset}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}