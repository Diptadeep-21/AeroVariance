import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: ReactNode;
  badge?: string;
  loading?: boolean;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  badge,
  loading = false,
  className,
}: MetricCardProps) {
  const TrendIcon =
    trend === undefined
      ? Minus
      : trend >= 0
      ? ArrowUpRight
      : ArrowDownRight;

  const trendColor =
    trend === undefined
      ? "text-[#9CA3AF]"
      : trend >= 0
      ? "text-[#15803D]"
      : "text-[#DC2626]";

  const getBadgeStyle = (b: string) => {
    const lower = b.toLowerCase();
    if (lower.includes("good")) return "bg-[#DCFCE7] text-[#15803D]";
    if (lower.includes("satisfactory")) return "bg-[#DCFCE7] text-[#16A34A]";
    if (lower.includes("moderate")) return "bg-[#FEF3C7] text-[#B45309]";
    if (lower.includes("poor") && !lower.includes("very")) return "bg-[#FFE4D5] text-[#C2410C]";
    if (lower.includes("very poor")) return "bg-[#FEE2E2] text-[#DC2626]";
    if (lower.includes("severe")) return "bg-[#F3D9DF] text-[#9F1239]";
    return "bg-[#FAFBFC] border border-[#E5E7EB] text-[#6B7280]";
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none transition-all duration-200 hover:border-slate-300",
        className
      )}
    >
      {/* Top Row: Label left, Icon in light gray box right */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-medium text-[#6B7280]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[12px] text-[#6B7280]">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-2 text-[#111827]">
            {icon}
          </div>
        )}
      </div>

      {/* Middle: Hero stat number (Serif 700) */}
      <div className="mt-4">
        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded-lg bg-[#FAFBFC]" />
        ) : (
          <h2 className="font-numeric text-[36px] font-bold tracking-tight text-[#111827] leading-none">
            {value}
          </h2>
        )}
      </div>

      {/* Bottom Row: Trend or — placeholder left, Badge right */}
      <div className="mt-5 flex items-center justify-between">
        {trend !== undefined ? (
          <div className={cn("flex items-center gap-1 text-[13px] font-medium", trendColor)}>
            <TrendIcon className="h-4 w-4" />
            {Math.abs(trend)}%
          </div>
        ) : (
          <span className="text-[14px] text-[#9CA3AF]">—</span>
        )}

        {badge && (
          <span className={cn("rounded-full px-3 py-1 text-[12px] font-medium", getBadgeStyle(badge))}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}