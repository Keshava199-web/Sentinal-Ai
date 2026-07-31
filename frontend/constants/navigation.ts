import {
  Activity,
  Bell,
  LayoutDashboard,
  Settings,
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
    href: "/incidents",
    icon: ShieldAlert,
  },
  {
    label: "IOCs",
    href: "/iocs",
    icon: Activity,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    label: "Timeline",
    href: "/timeline",
    icon: Activity,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;