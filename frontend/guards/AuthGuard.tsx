"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();

  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated,
    );

  const hasHydrated =
    useAuthStore(
      (state) => state.hasHydrated,
    );

  useEffect(() => {
    if (
      hasHydrated &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }
  }, [
    hasHydrated,
    isAuthenticated,
    router,
  ]);

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}