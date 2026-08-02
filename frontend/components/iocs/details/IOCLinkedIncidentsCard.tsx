import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { IOC } from "@/types/ioc";

interface IOCLinkedIncidentsCardProps {
  ioc: IOC;
}

export default function IOCLinkedIncidentsCard({
  ioc: _ioc,
}: IOCLinkedIncidentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Linked Incidents
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">
          Incident relationships
          will appear here once the
          backend integration is
          connected.
        </p>
      </CardContent>
    </Card>
  );
}