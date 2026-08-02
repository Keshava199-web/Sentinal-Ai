"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { IOC } from "@/types/ioc";

import { useDeleteIOC } from "@/hooks/useDeleteIOC";

interface DeleteIOCDialogProps {
  ioc: IOC | null;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;
}

export default function DeleteIOCDialog({
  ioc,
  open,
  onOpenChange,
}: DeleteIOCDialogProps) {
  const deleteIOCMutation =
    useDeleteIOC();

  const handleDelete =
    async () => {
      if (!ioc) {
        return;
      }

      try {
        await deleteIOCMutation.mutateAsync(
          ioc.id,
        );

        toast.success(
          "IOC deleted successfully.",
        );

        onOpenChange(false);
      } catch {
        toast.error(
          "Failed to delete IOC.",
        );
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete IOC
          </DialogTitle>

          <DialogDescription>
            This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want
            to delete this IOC?
          </p>

          {ioc && (
            <div className="rounded-md border p-4">
              <p className="font-medium">
                {ioc.value}
              </p>

              <p className="text-sm text-muted-foreground">
                {ioc.type}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={
                deleteIOCMutation.isPending
              }
              onClick={handleDelete}
            >
              {deleteIOCMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}