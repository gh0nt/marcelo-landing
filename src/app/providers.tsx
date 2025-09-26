"use client";

import { TooltipProvider } from "@/app/components/ui/tooltip";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        {children}
      </SnackbarProvider>
    </TooltipProvider>
  );
}
