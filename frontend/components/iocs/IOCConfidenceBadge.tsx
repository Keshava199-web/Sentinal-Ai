import { Badge } from "@/components/ui/badge";

interface IOCConfidenceBadgeProps {
  confidence: number;
}

export default function IOCConfidenceBadge({
  confidence,
}: IOCConfidenceBadgeProps) {
  let variant:
    | "default"
    | "secondary"
    | "outline"
    | "destructive";

  if (confidence >= 80) {
    variant = "destructive";
  } else if (confidence >= 60) {
    variant = "default";
  } else if (confidence >= 40) {
    variant = "secondary";
  } else {
    variant = "outline";
  }

  return (
    <Badge variant={variant}>
      {confidence}%
    </Badge>
  );
}