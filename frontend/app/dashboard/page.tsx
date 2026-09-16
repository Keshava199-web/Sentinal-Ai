"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentIncidents from "@/components/dashboard/RecentIncidents";
import RecentIOCs from "@/components/dashboard/RecentIOCs";
import SeverityOverview from "@/components/dashboard/SeverityOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-[1800px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="space-y-10">
        <DashboardHeader />

        <section aria-label="Security metrics">
          <DashboardStats />
        </section>

        <section aria-label="Quick actions">
          <QuickActions />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <RecentIncidents />
          <RecentIOCs />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <SeverityOverview />
          <RecentActivity />
        </section>
      </div>
    </main>
  );
}