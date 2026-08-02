import { Badge } from "@/components/ui/badge";

import type {
  IOCType,
} from "@/types/ioc";

interface IOCTypeBadgeProps {
  type: IOCType;
}

const variants: Record<
  IOCType,
  "default" | "secondary" | "destructive" | "outline"
> = {
  IP: "default",
  DOMAIN: "secondary",
  URL: "secondary",
  EMAIL: "secondary",
  SHA256: "outline",
  SHA1: "outline",
  MD5: "outline",
  FILE_NAME: "outline",
  CVE: "destructive",
  MITRE_TECHNIQUE: "destructive",
};

export default function IOCTypeBadge({
  type,
}: IOCTypeBadgeProps) {
  return (
    <Badge variant={variants[type]}>
      {type}
    </Badge>
  );
}