"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;

  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}