import { Card } from "@/components/ui/card";

const timelineEvents = [
  {
    id: 1,
    title: "Incident Created",
    description: "Incident was reported.",
    timestamp: "2026-08-02 09:10",
  },
  {
    id: 2,
    title: "Assigned",
    description: "Assigned to SOC Analyst.",
    timestamp: "2026-08-02 09:20",
  },
  {
    id: 3,
    title: "Status Updated",
    description: "Status changed to INVESTIGATING.",
    timestamp: "2026-08-02 09:35",
  },
];

export default function IncidentTimeline() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Investigation Timeline
      </h2>

      <div className="space-y-6">
        {timelineEvents.map((event) => (
          <div
            key={event.id}
            className="relative border-l-2 border-muted pl-5"
          >
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />

            <h3 className="font-medium">
              {event.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {event.description}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {event.timestamp}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}