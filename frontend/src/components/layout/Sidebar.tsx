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
    <aside className="sticky top-0 flex h-screen w-70 flex-col border-r border-border bg-white">

      {/* Logo */}

      <div className="border-b border-border px-8 py-7">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">

            <Wind className="h-5 w-5" />

          </div>

          <div>

            <h1 className="text-lg font-semibold tracking-tight">

              AeroVariance

            </h1>

            <p className="text-xs text-muted-foreground">

              Air Intelligence

            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

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
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",

                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                  )}
                >

                  <Icon className="h-5 w-5" />

                  {item.title}

                </Link>

              </li>
            );
          })}
        </ul>

      </nav>

      {/* Footer */}

      <div className="border-t border-border p-6">

        <div className="rounded-xl border border-border bg-slate-50 p-4">

          <p className="text-xs font-medium text-muted-foreground">

            SYSTEM STATUS

          </p>

          <div className="mt-3 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-sm">

              All services operational

            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}