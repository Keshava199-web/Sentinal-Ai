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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  IOC_SEVERITIES,
  IOC_STATUSES,
  type IOC,
  type UpdateIOCRequest,
} from "@/types/ioc";

import {
  updateIOCSchema,
  type UpdateIOCFormValues,
} from "@/validators/ioc.validator";

import { useUpdateIOC } from "@/hooks/useUpdateIOC";

interface UpdateIOCDialogProps {
  ioc: IOC | null;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;
}

export default function UpdateIOCDialog({
  ioc,
  open,
  onOpenChange,
}: UpdateIOCDialogProps) {
  const updateIOCMutation =
    useUpdateIOC();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting,
    },
  } = useForm<UpdateIOCFormValues>({
    resolver: zodResolver(
      updateIOCSchema,
    ),

    defaultValues: {
      description: "",
      severity: "LOW",
      status: "ACTIVE",
      confidence: 50,
      firstSeen: "",
      lastSeen: "",
    },
  });

  useEffect(() => {
    if (ioc) {
      reset({
        description:
          ioc.description ?? "",
        severity: ioc.severity,
        status: ioc.status,
        confidence: ioc.confidence,
        firstSeen:
          ioc.firstSeen ?? "",
        lastSeen:
          ioc.lastSeen ?? "",
      });
    }
  }, [ioc, reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (
    values: UpdateIOCFormValues,
  ) => {
    if (!ioc) {
      return;
    }

    try {
      const payload: UpdateIOCRequest = {
        severity: values.severity,
        status: values.status,
        confidence: values.confidence,
      };

      if (values.description) {
        payload.description =
          values.description;
      }

      if (values.firstSeen) {
        payload.firstSeen =
          values.firstSeen;
      }

      if (values.lastSeen) {
        payload.lastSeen =
          values.lastSeen;
      }

      await updateIOCMutation.mutateAsync({
        id: ioc.id,
        data: payload,
      });

      toast.success(
        "IOC updated successfully.",
      );

      onOpenChange(false);
    } catch {
      toast.error(
        "Failed to update IOC.",
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
            Update IOC
          </DialogTitle>

          <DialogDescription>
            Update Indicator of
            Compromise details.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Input
              id="description"
              {...register(
                "description",
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">
              Severity
            </Label>

            <select
              id="severity"
              {...register(
                "severity",
              )}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Status
            </Label>

            <select
              id="status"
              {...register(
                "status",
              )}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="confidence">
              Confidence
            </Label>

            <Input
              id="confidence"
              type="number"
              min={0}
              max={100}
              {...register(
                "confidence",
                {
                  valueAsNumber: true,
                },
              )}
            />
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
                updateIOCMutation.isPending
              }
            >
              {updateIOCMutation.isPending
                ? "Updating..."
                : "Update IOC"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}