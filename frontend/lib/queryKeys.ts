export const queryKeys = {
  incidents: ["incidents"] as const,

  incident: (id: string) =>
    [...queryKeys.incidents, id] as const,

  users: ["users"] as const,

  alerts: ["alerts"] as const,

  iocs: ["iocs"] as const,

  timeline: ["timeline"] as const,
};