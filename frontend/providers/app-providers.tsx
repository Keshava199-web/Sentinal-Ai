"use client";

import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <TooltipProvider>
          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}