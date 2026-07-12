import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

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
      ? "text-muted-foreground"
      : trend >= 0
      ? "text-emerald-600"
      : "text-red-600";

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">

        <div>

          <CardTitle className="text-sm font-medium text-muted-foreground">

            {title}

          </CardTitle>

          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">

              {subtitle}

            </p>
          )}

        </div>

        {icon && (
          <div className="rounded-lg border bg-slate-50 p-2">

            {icon}

          </div>
        )}

      </CardHeader>

      <CardContent>

        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
        ) : (
          <h2 className="text-4xl font-bold tracking-tight">

            {value}

          </h2>
        )}

        <div className="mt-5 flex items-center justify-between">

          {trend !== undefined ? (

            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trendColor
              )}
            >

              <TrendIcon className="h-4 w-4" />

              {Math.abs(trend)}%

            </div>

          ) : (

            <span className="text-sm text-muted-foreground">

              —

            </span>

          )}

          {badge && (

            <Badge variant="secondary">

              {badge}

            </Badge>

          )}

        </div>

      </CardContent>
    </Card>
  );
}