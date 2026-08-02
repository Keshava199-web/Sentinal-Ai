"use client";

import { useState } from "react";

import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";

import IOCTable from "@/components/iocs/IOCTable";
import CreateIOCDialog from "@/components/iocs/CreateIOCDialog";
import UpdateIOCDialog from "@/components/iocs/UpdateIOCDialog";
import DeleteIOCDialog from "@/components/iocs/DeleteIOCDialog";

import { Button } from "@/components/ui/button";

import { useIOCs } from "@/hooks/useIOCs";

import type { IOC } from "@/types/ioc";

export default function IOCsPage() {
  const {
    data,
    isPending,
    isError,
  } = useIOCs();

  const [createOpen, setCreateOpen] =
    useState(false);

  const [updateOpen, setUpdateOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedIOC, setSelectedIOC] =
    useState<IOC | null>(null);

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState message="Failed to load IOCs." />
    );
  }

  const iocs = data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Indicators of Compromise
          </h1>

          <p className="text-muted-foreground">
            Manage IOC intelligence across
            investigations.
          </p>
        </div>

        <Button
          onClick={() =>
            setCreateOpen(true)
          }
        >
          Create IOC
        </Button>
      </div>

      {/* Empty */}

      {iocs.length === 0 ? (
        <EmptyState
          title="No IOCs Found"
          description="Create your first Indicator of Compromise."
        />
      ) : (
        <IOCTable
          iocs={iocs}
          onEdit={(ioc) => {
            setSelectedIOC(ioc);
            setUpdateOpen(true);
          }}
          onDelete={(ioc) => {
            setSelectedIOC(ioc);
            setDeleteOpen(true);
          }}
        />
      )}

      {/* Dialogs */}

      <CreateIOCDialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      />

      <UpdateIOCDialog
        ioc={selectedIOC}
        open={updateOpen}
        onOpenChange={(open) => {
          setUpdateOpen(open);

          if (!open) {
            setSelectedIOC(null);
          }
        }}
      />

      <DeleteIOCDialog
        ioc={selectedIOC}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setSelectedIOC(null);
          }
        }}
      />
    </div>
  );
}