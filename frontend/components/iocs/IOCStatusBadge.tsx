import { Badge } from "@/components/ui/badge";

import type {
  IOCStatus,
} from "@/types/ioc";

interface IOCStatusBadgeProps {
  status: IOCStatus;
}

const variants: Record<
  IOCStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  ACTIVE: "default",
  WHITELISTED: "secondary",
  FALSE_POSITIVE: "destructive",
  EXPIRED: "outline",
};

export default function IOCStatusBadge({
  status,
}: IOCStatusBadgeProps) {
  return (
    <Badge variant={variants[status]}>
      {status}
    </Badge>
  );
}