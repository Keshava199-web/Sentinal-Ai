import {
  Activity,
  Bell,
  LayoutDashboard,
  ShieldAlert,
  Users,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Incidents",
    href: "/dashboard/incidents",
    icon: ShieldAlert,
  },
  {
    label: "IOCs",
    href: "/dashboard/iocs",
    icon: Activity,
  },
  {
    label: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    label: "Timeline",
    href: "/dashboard/timeline",
    icon: Activity,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
] as const;