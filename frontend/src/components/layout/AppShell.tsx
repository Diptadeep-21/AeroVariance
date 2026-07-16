"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useDashboardInitializer } from "@/hooks/useDashboardInitializer";
import { useDashboardData } from "@/hooks/useDashboardData";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {

   useDashboardInitializer();

  useDashboardData();


  return (
    <div className="min-h-screen bg-background">
      <div className="flex"> 
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />

          <main className="flex-1 bg-background px-8 py-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}