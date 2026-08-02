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
  IOC_TYPES,
  IOC_SEVERITIES,
  IOC_SOURCES,
  type CreateIOCRequest,
} from "@/types/ioc";

import {
  createIOCSchema,
  type CreateIOCFormValues,
} from "@/validators/ioc.validator";

import { useCreateIOC } from "@/hooks/useCreateIOC";

interface CreateIOCDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateIOCDialog({
  open,
  onOpenChange,
}: CreateIOCDialogProps) {
  const createIOCMutation =
    useCreateIOC();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateIOCFormValues>({
    resolver: zodResolver(
      createIOCSchema,
    ),

    defaultValues: {
      type: "IP",
      value: "",
      description: "",
      severity: "LOW",
      confidence: 50,
      firstSeen: "",
      lastSeen: "",
      source: "MANUAL",
    },
  });

  const onSubmit = async (
    values: CreateIOCFormValues,
  ) => {
    try {
      const payload: CreateIOCRequest = {
        type: values.type,
        value: values.value,
        severity: values.severity,
        confidence: values.confidence,
        source: values.source,
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

      await createIOCMutation.mutateAsync(
        payload,
      );

      toast.success(
        "IOC created successfully.",
      );

      reset();

      onOpenChange(false);
    } catch {
      toast.error(
        "Failed to create IOC.",
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
            Create IOC
          </DialogTitle>

          <DialogDescription>
            Register a new Indicator of
            Compromise.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* IOC Type */}

          <div className="space-y-2">
            <Label htmlFor="type">
              IOC Type
            </Label>

            <select
              id="type"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              {...register("type")}
            >
              {IOC_TYPES.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* IOC Value */}

          <div className="space-y-2">
            <Label htmlFor="value">
              Value
            </Label>

            <Input
              id="value"
              placeholder="192.168.1.10"
              {...register("value")}
            />

            {errors.value && (
              <p className="text-sm text-destructive">
                {errors.value.message}
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
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              {...register("description")}
            />
          </div>

          {/* Severity */}

          <div className="space-y-2">
            <Label htmlFor="severity">
              Severity
            </Label>

            <select
              id="severity"
              {...register("severity")}
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

          {/* Confidence */}

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

          {/* Source */}

          <div className="space-y-2">
            <Label htmlFor="source">
              Source
            </Label>

            <select
              id="source"
              {...register("source")}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              {IOC_SOURCES.map((source) => (
                <option
                  key={source}
                  value={source}
                >
                  {source}
                </option>
              ))}
            </select>
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
                createIOCMutation.isPending
              }
            >
              {createIOCMutation.isPending
                ? "Creating..."
                : "Create IOC"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}