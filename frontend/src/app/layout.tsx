import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AeroVariance",
    template: "%s | AeroVariance",
  },
  description:
    "AI-powered Air Quality Intelligence Platform for forecasting, source attribution, simulations, and public advisories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}