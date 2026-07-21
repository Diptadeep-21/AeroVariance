"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPinned,
  CloudSun,
  SlidersHorizontal,
  ShieldAlert,
  Wind,
  BarChart3,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Forecast",
    href: "/forecast",
    icon: CloudSun,
  },
  {
    title: "Map",
    href: "/map",
    icon: MapPinned,
  },
  {
    title: "Interventions",
    href: "/interventions",
    icon: SlidersHorizontal,
  },
  {
    title: "Advisories",
    href: "/advisories",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Compare Cities",
    href: "/compare-cities",
    icon: Building2,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-70 flex-col border-r border-[#E5E7EB] bg-white">
      {/* Logo */}
      <div className="border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-xs">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-serif text-[18px] font-bold tracking-tight text-[#111827]">
              AeroVariance
            </h1>
            <p className="text-[12px] text-[#6B7280]">
              Air Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-150",
                    active
                      ? "bg-[#EFF6FF] text-[#2563EB]"
                      : "text-[#6B7280] hover:bg-[#FAFBFC] hover:text-[#111827]"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-[#2563EB]" : "text-[#6B7280]")} />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer System Status */}
      <div className="border-t border-[#E5E7EB] p-6">
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7280]">
            SYSTEM STATUS
          </p>
          <div className="mt-2.5 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[13px] font-medium text-[#111827]">
              All services operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}