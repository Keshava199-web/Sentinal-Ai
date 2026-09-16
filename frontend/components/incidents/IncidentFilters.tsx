"use client";

import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  INCIDENT_SEVERITIES,
  INCIDENT_STATUSES,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/types/incident";

interface IncidentFiltersProps {
  search: string;
  severity: IncidentSeverity | "";
  status: IncidentStatus | "";

  onSearchChange: (value: string) => void;
  onSeverityChange: (value: IncidentSeverity | "") => void;
  onStatusChange: (value: IncidentStatus | "") => void;

  onReset: () => void;
}

export default function IncidentFilters({
  search,
  severity,
  status,
  onSearchChange,
  onSeverityChange,
  onStatusChange,
  onReset,
}: IncidentFiltersProps) {
  const hasFilters = Boolean(search || severity || status);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <SlidersHorizontal
          className="h-3.5 w-3.5 text-white/30"
          strokeWidth={1.6}
        />

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
          Investigation filters
        </span>

        {hasFilters && (
          <span className="ml-auto text-[9px] uppercase tracking-[0.16em] text-white/25">
            Filters active
          </span>
        )}
      </div>

      <div className="grid gap-2 lg:grid-cols-[minmax(240px,1.7fr)_1fr_1fr_auto]">
        {/* Search */}
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/25"
            strokeWidth={1.7}
          />

          <Input
            value={search}
            placeholder="Search incidents..."
            aria-label="Search incidents"
            className="h-10 rounded-xl border-white/[0.08] bg-white/[0.025] pl-10 pr-9 text-xs text-white placeholder:text-white/25 focus-visible:border-white/[0.16] focus-visible:ring-0"
            onChange={(event) => onSearchChange(event.target.value)}
          />

          {search && (
            <button
              type="button"
              aria-label="Clear incident search"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md text-white/25 transition-colors hover:bg-white/[0.06] hover:text-white/70"
            >
              <X className="h-3 w-3" strokeWidth={1.7} />
            </button>
          )}
        </div>

        {/* Severity */}
        <FilterSelect
          ariaLabel="Filter by severity"
          value={severity}
          onChange={(value) =>
            onSeverityChange(value as IncidentSeverity | "")
          }
          options={INCIDENT_SEVERITIES}
          allLabel="All severities"
        />

        {/* Status */}
        <FilterSelect
          ariaLabel="Filter by status"
          value={status}
          onChange={(value) =>
            onStatusChange(value as IncidentStatus | "")
          }
          options={INCIDENT_STATUSES}
          allLabel="All statuses"
        />

        {/* Reset */}
        <Button
          type="button"
          variant="outline"
          disabled={!hasFilters}
          onClick={onReset}
          className="h-10 rounded-xl border-white/[0.08] bg-white/[0.025] px-4 text-xs text-white/45 shadow-none transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <RotateCcw
            className="mr-2 h-3.5 w-3.5"
            strokeWidth={1.6}
          />
          Reset
        </Button>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  allLabel: string;
}

function FilterSelect({
  ariaLabel,
  value,
  onChange,
  options,
  allLabel,
}: FilterSelectProps) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-white/55 outline-none transition-colors focus:border-white/[0.16] focus:ring-0"
    >
      <option
        value=""
        className="bg-[#08090a] text-white"
      >
        {allLabel}
      </option>

      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-[#08090a] text-white"
        >
          {formatFilterLabel(option)}
        </option>
      ))}
    </select>
  );
}

function formatFilterLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}