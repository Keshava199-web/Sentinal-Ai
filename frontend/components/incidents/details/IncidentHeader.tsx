import type {
  Incident,
} from "@/types/incident";

interface IncidentHeaderProps {
  incident: Incident;
}

export default function IncidentHeader({
  incident,
}: IncidentHeaderProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h1 className="text-2xl font-bold">
        {incident.title}
      </h1>
    </div>
  );
}