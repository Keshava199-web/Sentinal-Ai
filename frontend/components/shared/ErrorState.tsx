"use client";

import { TriangleAlert } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({
  message,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <TriangleAlert className="mb-4 h-12 w-12 text-destructive" />

      <p>{message}</p>
    </div>
  );
}