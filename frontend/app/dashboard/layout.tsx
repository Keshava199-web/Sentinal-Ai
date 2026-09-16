import AuthGuard from "@/guards/AuthGuard";
import SentinelShell from "@/components/layout/SentinelShell";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <SentinelShell>{children}</SentinelShell>
    </AuthGuard>
  );
}