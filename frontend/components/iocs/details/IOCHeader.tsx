import IOCTypeBadge from "../IOCTypeBadge";
import IOCStatusBadge from "../IOCStatusBadge";
import IOCConfidenceBadge from "../IOCConfidenceBadge";

import type { IOC } from "@/types/ioc";

interface IOCHeaderProps {
  ioc: IOC;
}

export default function IOCHeader({
  ioc,
}: IOCHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <IOCTypeBadge type={ioc.type} />

        <IOCStatusBadge status={ioc.status} />

        <IOCConfidenceBadge
          confidence={ioc.confidence}
        />
      </div>

      <h1 className="font-mono text-3xl font-bold break-all">
        {ioc.value}
      </h1>

      <p className="text-muted-foreground">
        {ioc.description ??
          "No description available."}
      </p>
    </div>
  );
}