import { Card } from "@/components/ui/card";

import type {
  Incident,
} from "@/types/incident";

interface IncidentOverviewCardProps {
  incident: Incident;
}

export default function IncidentOverviewCard({
  incident,
}: IncidentOverviewCardProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Incident Overview
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Description
          </p>

          <p className="mt-1 whitespace-pre-wrap">
            {incident.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Source IP
            </p>

            <p>
              {incident.sourceIp ?? "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Incident ID
            </p>

            <p className="font-mono text-sm">
              {incident.id}
            </p>
          </div>

        </div>

      </div>
    </Card>
  );
}