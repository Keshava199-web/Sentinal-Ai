import AuthGuard from "@/guards/AuthGuard";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}