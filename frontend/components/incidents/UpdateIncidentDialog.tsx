"use client";

import { useEffect } from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  updateIncidentSchema,
  type UpdateIncidentFormValues,
} from "@/validators/incident.validator";

import {
  INCIDENT_STATUSES,
  type Incident,
} from "@/types/incident";

import { useUpdateIncident } from "@/hooks/useUpdateIncident";

interface UpdateIncidentDialogProps {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateIncidentDialog({
  incident,
  open,
  onOpenChange,
}: UpdateIncidentDialogProps) {
  const updateIncidentMutation =
    useUpdateIncident();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateIncidentFormValues>({
    resolver: zodResolver(
      updateIncidentSchema,
    ),
    defaultValues: {
      status: "OPEN",
    },
  });

  useEffect(() => {
  if (!open) {
    reset({
      status: "OPEN",
    });
    return;
  }

  if (incident) {
    reset({
      status: incident.status,
    });
  }
}, [open, incident, reset]);

  const onSubmit = async (
    values: UpdateIncidentFormValues,
  ) => {
    if (!incident) {
      return;
    }

    try {
      await updateIncidentMutation.mutateAsync({
        id: incident.id,
        payload: values,
      });

      toast.success(
        "Incident updated successfully.",
      );

      reset();

      onOpenChange(false);
    } catch {
      toast.error(
        "Failed to update incident.",
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Update Incident
          </DialogTitle>

          <DialogDescription>
            Update the incident status.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="status">
              Status
            </Label>

            <select
              id="status"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              {...register("status")}
            >
              {INCIDENT_STATUSES.map(
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

            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                updateIncidentMutation.isPending
              }
            >
              {updateIncidentMutation.isPending
                ? "Updating..."
                : "Update Incident"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}