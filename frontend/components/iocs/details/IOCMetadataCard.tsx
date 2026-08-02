import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { IOC } from "@/types/ioc";

interface IOCMetadataCardProps {
  ioc: IOC;
}

export default function IOCMetadataCard({
  ioc,
}: IOCMetadataCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Metadata
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>
          <strong>Created:</strong>{" "}
          {new Date(
            ioc.createdAt,
          ).toLocaleString()}
        </p>

        <p>
          <strong>Updated:</strong>{" "}
          {new Date(
            ioc.updatedAt,
          ).toLocaleString()}
        </p>

        <p>
          <strong>First Seen:</strong>{" "}
          {ioc.firstSeen ?? "-"}
        </p>

        <p>
          <strong>Last Seen:</strong>{" "}
          {ioc.lastSeen ?? "-"}
        </p>
      </CardContent>
    </Card>
  );
}