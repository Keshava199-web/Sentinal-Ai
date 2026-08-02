import { Card } from "@/components/ui/card";

export default function IncidentNotesPanel() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Analyst Notes
      </h2>

      <textarea
        rows={8}
        placeholder="Add investigation notes..."
        className="w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </Card>
  );
}