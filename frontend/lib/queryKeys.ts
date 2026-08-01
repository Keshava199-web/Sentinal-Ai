export const queryKeys = {
  incidents: ["incidents"] as const,

  incident: (id: string) =>
    ["incident", id] as const,

  users: ["users"] as const,

  alerts: ["alerts"] as const,

  iocs: ["iocs"] as const,

  timeline: ["timeline"] as const,
};