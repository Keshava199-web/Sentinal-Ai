import { Card } from "@/components/ui/card";

const evidence = [
  "memory.raw",
  "network_capture.pcap",
  "powershell.log",
];

export default function IncidentEvidencePanel() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Evidence
      </h2>

      <div className="space-y-3">
        {evidence.map((file) => (
          <div
            key={file}
            className="rounded-md border p-3"
          >
            {file}
          </div>
        ))}
      </div>
    </Card>
  );
}