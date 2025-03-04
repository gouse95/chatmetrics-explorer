
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  isLoading = false,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden rounded-xl p-6 animate-scale-in",
        className
      )}
    >
      {isLoading ? (
        <div className="flex h-full w-full flex-col space-y-3">
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-8 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
          {description && (
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {icon && <div className="text-muted-foreground">{icon}</div>}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">{value}</h2>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </>
      )}
    </div>
  );
}
