import { Card } from "@/components/ui/card";

import SeverityBadge from "@/components/incidents/SeverityBadge";
import StatusBadge from "@/components/incidents/StatusBadge";

import type {
  Incident,
} from "@/types/incident";

interface IncidentMetadataCardProps {
  incident: Incident;
}

export default function IncidentMetadataCard({
  incident,
}: IncidentMetadataCardProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Incident Metadata
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Severity
          </span>

          <SeverityBadge
            severity={incident.severity}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Status
          </span>

          <StatusBadge
            status={incident.status}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Assigned Analyst
          </span>

          <span>
            {incident.assignedToId ??
              "Unassigned"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Created
          </span>

          <span>
            {new Date(
              incident.createdAt,
            ).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Updated
          </span>

          <span>
            {new Date(
              incident.updatedAt,
            ).toLocaleString()}
          </span>
        </div>

      </div>
    </Card>
  );
}