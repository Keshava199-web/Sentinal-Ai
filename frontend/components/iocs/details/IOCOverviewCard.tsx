import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { IOC } from "@/types/ioc";

interface IOCOverviewCardProps {
  ioc: IOC;
}

export default function IOCOverviewCard({
  ioc,
}: IOCOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          IOC Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>
          <strong>Type:</strong>{" "}
          {ioc.type}
        </p>

        <p>
          <strong>Severity:</strong>{" "}
          {ioc.severity}
        </p>

        <p>
          <strong>Source:</strong>{" "}
          {ioc.source}
        </p>

        <p>
          <strong>Confidence:</strong>{" "}
          {ioc.confidence}%
        </p>
      </CardContent>
    </Card>
  );
}