"use client";

import DashboardView from "@/features/dashboard/DashboardView";

import { useDashboardInitializer } from "@/hooks/useDashboardInitializer";

export default function DashboardPage() {
  useDashboardInitializer();

  return <DashboardView />;
}