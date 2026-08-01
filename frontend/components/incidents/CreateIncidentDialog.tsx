"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createIncidentSchema,
  type CreateIncidentFormValues,
} from "@/validators/incident.validator";

import type {
  CreateIncidentRequest,
} from "@/types/incident";

import {
  INCIDENT_SEVERITIES,
} from "@/types/incident";

import { useCreateIncident } from "@/hooks/useCreateIncident";

interface CreateIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateIncidentDialog({
  open,
  onOpenChange,
}: CreateIncidentDialogProps) {
  const createIncidentMutation =
    useCreateIncident();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateIncidentFormValues>({
    resolver: zodResolver(
      createIncidentSchema,
    ),

    defaultValues: {
      title: "",
      description: "",
      severity: "LOW",
      sourceIp: "",
    },
  });

  const onSubmit = async (
    values: CreateIncidentFormValues,
  ) => {
    try {
      const payload: CreateIncidentRequest = {
        title: values.title,
        description: values.description,
        severity: values.severity,
      };

      if (values.sourceIp) {
        payload.sourceIp = values.sourceIp;
      }

      await createIncidentMutation.mutateAsync(payload);

      toast.success("Incident created successfully.");

      reset();

      onOpenChange(false);
    } catch {
      toast.error(
        "Failed to create incident.",
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Create Incident
          </DialogTitle>

          <DialogDescription>
            Record a new security incident for investigation.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}

          <div className="space-y-2">
            <Label htmlFor="title">
              Title
            </Label>

            <Input
              id="title"
              placeholder="Suspicious PowerShell Execution"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <textarea
              id="description"
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe the security incident..."
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Severity */}

          <div className="space-y-2">
            <Label htmlFor="severity">
              Severity
            </Label>

              <select
                id="severity"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                {...register("severity")}
              >
                {INCIDENT_SEVERITIES.map((severity) => (
                  <option
                    key={severity}
                    value={severity}
                  >
                    {severity}
                  </option>
                ))}
              </select>

            {errors.severity && (
              <p className="text-sm text-destructive">
                {errors.severity.message}
              </p>
            )}
          </div>

          {/* Source IP */}

          <div className="space-y-2">
            <Label htmlFor="sourceIp">
              Source IP
            </Label>

            <Input
              id="sourceIp"
              placeholder="192.168.1.100"
              {...register("sourceIp")}
            />

            {errors.sourceIp && (
              <p className="text-sm text-destructive">
                {errors.sourceIp.message}
              </p>
            )}
          </div>

          {/* Footer */}

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
                createIncidentMutation.isPending
              }
            >
              {createIncidentMutation.isPending
                ? "Creating..."
                : "Create Incident"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}